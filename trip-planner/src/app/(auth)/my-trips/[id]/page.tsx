'use client';

import { ActivitiesSection } from '@/components/features/Trip/TripActivities/ActivitiesSection.tsx/ActivitiesSection';
import { TripSummaryCard } from '@/components/features/Trip/TripSummary/TripSummaryCard/TripSummaryCard';
import { authFetcher } from '@/fetchers/fetchers';
import { swrKeys } from '@/fetchers/keys';
import { IActivityItem } from '@/typings/activity';
import { ITripSummary } from '@/typings/trip';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function TripPage() {
	const id = useParams().id as string;
	console.log(swrKeys.trips(`/${id}`));
	const tripProps = useSWR(swrKeys.trips(`/${id}`), authFetcher<ITripSummary>);

	const activitiesProps = useSWR(swrKeys.activities(id, 'Sara'), authFetcher<IActivityItem[]>);

	if (tripProps.error || activitiesProps.error) {
		return <Box>Something went wrong...</Box>;
	}
	if (tripProps.isLoading || activitiesProps.isLoading || !activitiesProps.data || !tripProps.data) {
		return <Box>Loading...</Box>;
	}
	return (
		<Flex direction="column" justifyContent="space-between">
			<Heading>{tripProps.data?.title}</Heading>
			<ActivitiesSection activities={activitiesProps.data} tripOwnerUsername="Sara" tripId={id} />
		</Flex>
	);
}

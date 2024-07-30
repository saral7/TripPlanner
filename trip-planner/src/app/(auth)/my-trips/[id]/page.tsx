'use client';

import { TripSummaryCard } from '@/components/features/Trip/TripSummary/TripSummaryCard/TripSummaryCard';
import { authFetcher } from '@/fetchers/fetchers';
import { swrKeys } from '@/fetchers/keys';
import { ITripSummary } from '@/typings/trip';
import { Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function TripPage() {
	const id = useParams().id;
	console.log(swrKeys.trips(`/${id}`));
	const { data, isLoading, error } = useSWR(swrKeys.trips(`/${id}`), authFetcher<ITripSummary>);
	if (error) {
		return <Box>Something went wrong...</Box>;
	}
	if (isLoading || !data) {
		return <Box>Loading...</Box>;
	}
	return <TripSummaryCard trip={data} />;
}

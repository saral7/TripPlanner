'use client';

import { TripCreateModal } from '@/components/features/Trip/TripCreateModal/TripCreateModal';
import {
	ITripSummaryListProps,
	TripSummaryList,
} from '@/components/features/Trip/TripSummary/TripSummaryList/TripSummaryList';
import { authFetcher, fetcher } from '@/fetchers/fetchers';
import { keys, swrKeys } from '@/fetchers/keys';
import { ITripSummary } from '@/typings/trip';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, TagRightIcon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';

export default function Home() {
	const { data, isLoading, error } = useSWR<ITripSummary[]>(swrKeys.trips(''), authFetcher);
	const [cnt, setCnt] = useState(4);

	if (error) {
		return <Box>Something went wrong...</Box>;
	}
	if (isLoading || !data) {
		return <Box>Loading...</Box>;
	}
	return (
		<Box>
			<Flex justifyContent="end">
				<TripCreateModal cnt={cnt} setCnt={setCnt} />
			</Flex>
			<Flex direction="column" justifyContent="space-between">
				<Heading fontWeight="bold"> Your previous trips... </Heading>
				<TripSummaryList trips={data} />
			</Flex>
		</Box>
	);
}

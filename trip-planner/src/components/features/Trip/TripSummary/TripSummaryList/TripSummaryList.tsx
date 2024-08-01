'use client';

import { ITripSummary } from '@/typings/trip';
import { TripSummaryCard } from '../TripSummaryCard/TripSummaryCard';
import { Flex } from '@chakra-ui/react';
import { keys } from '@/fetchers/keys';
import NextLink from 'next/link';

export interface ITripSummaryListProps {
	trips: Array<ITripSummary>;
}

export function TripSummaryList({ trips }: ITripSummaryListProps) {
	console.log('u listi');
	return (
		<Flex margin="auto" direction="column" justifyContent="space-between" padding="16px" gap="16px">
			{trips.map((trip, index) => {
				console.log(trip.titleImage);
				return (
					<NextLink key={index} href={`/my-trips/${trip.tripId}`}>
						<TripSummaryCard trip={trip} />
					</NextLink>
				);
			})}
		</Flex>
	);
}

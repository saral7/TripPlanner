'use client';

import { ITripSummary } from '@/typings/trip';
import { Card, CardBody, CardProps, Flex, Heading, Image, Tag } from '@chakra-ui/react';

interface ITripSummaryProps extends CardProps {
	trip: ITripSummary;
}

export function TripSummaryCard({ trip: { titleImage, title, destination, startDate, endDate } }: ITripSummaryProps) {
	return (
		<Card display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="8px">
			<Image width="100px" height="100px" src={titleImage} />
			<CardBody display="flex" flexDirection="column" justifyContent="space-between">
				<Heading>{title}</Heading>
				<Flex justifyContent="end" gap="8px">
					<Tag color="gray.500">{destination}</Tag>
					<Tag color="gray.500">{`${startDate} - ${endDate}`}</Tag>
				</Flex>
			</CardBody>
		</Card>
	);
}

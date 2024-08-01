import { IActivityItem, IActivityItemDisplay } from '@/typings/activity';
import { Card, CardBody, Flex, Heading, Tag } from '@chakra-ui/react';

interface IActivityItemSummaryProps {
	activity: IActivityItem;
	displayProps: IActivityItemDisplay;
}

export function ActivityItemSummary({ activity, displayProps }: IActivityItemSummaryProps) {
	return (
		<Card display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="8px">
			<CardBody display="flex" flexDirection="column" justifyContent="space-between">
				<Heading>{activity.title}</Heading>
				<Flex justifyContent="end" gap="8px">
					{activity.cost && displayProps.cost && <Tag>{`$${activity.cost}`}</Tag>}
				</Flex>
			</CardBody>
		</Card>
	);
}

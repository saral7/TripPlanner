import { IActivityItem, IActivityItemDisplay } from '@/typings/activity';
import { ActivityItemSummary } from '../ActivityItemSummary/ActivityItemSummary';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Avatar, Box, Flex, Heading, IconButton, Tag, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowDownIcon, CalendarIcon, InfoIcon, LinkIcon } from '@chakra-ui/icons';
import { TiPinOutline } from 'react-icons/ti';
import NextLink from 'next/link';

interface IActivityItemProps {
	activity: IActivityItem;
	displayProps: IActivityItemDisplay;
}

export function ActivityItem({ activity, displayProps }: IActivityItemProps) {
	return (
		<AccordionItem width="100%" padding="8px" borderBottom="1px solid lightgrey" borderTop="1px solid lightgrey">
			<Heading fontSize="24px" marginBottom="8px">
				<AccordionButton>
					<Avatar
						name={activity.activityCreatorUsername}
						backgroundColor="orange.500"
						boxSize="24px"
						marginRight="8px"
					/>
					<Box as="span" flex="1" textAlign="left">
						{activity.title}
						{activity.activityUrl && (
							<NextLink href={activity.activityUrl}>
								<LinkIcon boxSize="16px" marginLeft="8px" />
							</NextLink>
						)}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</Heading>
			<Flex gap="8px">
				{activity.cost && displayProps.cost && <Tag>{`$ ${activity.cost}`}</Tag>}
				{activity.location &&
					displayProps.location &&
					(activity.locationUrl ? (
						<NextLink href={activity.locationUrl}>
							<Tag gap="8px">
								<TiPinOutline size="20px" />
								{`${activity.location}`}
							</Tag>
						</NextLink>
					) : (
						<Tag gap="8px">
							<TiPinOutline />
							{`${activity.location}`}
						</Tag>
					))}
				{activity.date && displayProps.date && (
					<Tag gap="8px">
						<CalendarIcon />
						{`${activity.date}`}
					</Tag>
				)}
			</Flex>

			<AccordionPanel marginTop="16px" width="100%">
				<Text>{activity.description}</Text>
			</AccordionPanel>
		</AccordionItem>
	);
}

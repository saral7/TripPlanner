import { AddIcon, InfoIcon } from '@chakra-ui/icons';
import { ButtonGroup, Flex, Heading, IconButton } from '@chakra-ui/react';
import { ActivityItem } from '../ActivityItem/ActivityItem';
import { IActivityItem, IActivityItemDisplay } from '@/typings/activity';
import { Accordion } from '@chakra-ui/accordion';
import { useState } from 'react';
import { ActivityForm } from '../ActivityForm/ActivityForm';

const mockActiviites: IActivityItem[] = [
	{
		tripOwnerUsername: 'Sara',
		tripId: '1',
		activityId: '1',
		title: 'Cheese degustation',
		activityCreatorUsername: 'Sara',
		cost: 76.0,
		date: '7/12/2008',
		location: 'St Mary Street 8',
		locationUrl: 'https://maps.app.goo.gl/1hdBZonMasvpJ8pL6',
		description: 'Found this cool cheese restaurant, we should totaly check it out!',
	},
	{
		tripOwnerUsername: 'Sara',
		tripId: '1',
		activityId: '1',
		title: 'Cycling in Paris',
		activityCreatorUsername: 'Sara',
		cost: 76.0,
		date: '7/12/2008',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ulla`,
		activityUrl: 'https://react-icons.github.io/react-icons/search/#q=pin',
	},
];

const displayProps: IActivityItemDisplay = {
	cost: true,
	activityCreatorUsername: true,
	description: true,
	location: true,
	date: true,
};

interface IActivitiesSectionProps {
	activities: IActivityItem[];
	tripId: string;
	tripOwnerUsername: string;
}
export function ActivitiesSection({ activities, tripId, tripOwnerUsername }: IActivitiesSectionProps) {
	const [showActivityForm, setShowActivityForm] = useState(false);

	return (
		<Flex direction="column" justifyContent="space-between">
			<Flex justifyContent="space-between" width="100%">
				<Heading>Activities...</Heading>
				<ButtonGroup>
					<IconButton aria-label={''} onClick={() => setShowActivityForm(!showActivityForm)}>
						<AddIcon />
					</IconButton>
					<IconButton aria-label={''}>
						<InfoIcon />
					</IconButton>
				</ButtonGroup>
			</Flex>
			{showActivityForm && (
				<ActivityForm
					tripId={tripId}
					tripOwnerUsername={tripOwnerUsername}
					onSubmitSuccess={() => setShowActivityForm(false)}
				/>
			)}
			<Accordion allowMultiple display="flex" flexDirection="column" width="500px" gap="16px">
				{activities.map((activity, index) => (
					<ActivityItem key={index} activity={activity} displayProps={displayProps} />
				))}
			</Accordion>
		</Flex>
	);
}

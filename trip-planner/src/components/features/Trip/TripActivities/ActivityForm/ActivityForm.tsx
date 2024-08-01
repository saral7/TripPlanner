import { swrKeys } from '@/fetchers/keys';
import { createActivity } from '@/fetchers/mutators';
import { IActivityItem } from '@/typings/activity';
import { LinkIcon, MinusIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	chakra,
	Checkbox,
	Flex,
	FormControl,
	Heading,
	Input,
	Textarea,
	Text,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	InputRightElement,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBullseye } from 'react-icons/fa';
import useSWRMutation from 'swr/mutation';

interface IActivityFormData {
	title: string;
	activityUrl?: string;
	description?: string;
	location?: string;
	locationUrl?: string;
	cost?: number;
	date?: string;
}

interface IActivityFormProps {
	tripId: string;
	tripOwnerUsername: string;
	onSubmitSuccess: () => void;
}

export function ActivityForm({ tripId, tripOwnerUsername, onSubmitSuccess }: IActivityFormProps) {
	const [showActivityLinkInput, setShowActivityLinkInput] = useState(false);
	const [showLocationLinkInput, setShowLocationLinkInput] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IActivityFormData>();

	const { trigger } = useSWRMutation(swrKeys.activities(tripId, tripOwnerUsername), createActivity, {
		onSuccess: () => {
			onSubmitSuccess();
		},
	});

	const submitActivity = (data: IActivityFormData) => {
		console.log(data);
		const newActivity: IActivityItem = {
			...data,
			tripOwnerUsername: tripOwnerUsername,
			tripId: tripId,
			activityCreatorUsername: 'Sara',
		};
		newActivity.description = newActivity.description == '' ? undefined : newActivity.description;
		try {
			trigger(newActivity);
		} catch (err) {}
	};
	return (
		<chakra.form
			display="flex"
			flexDirection="column"
			gap="16px"
			border="1px solid gray"
			padding="16px"
			borderRadius="16px"
		>
			<Heading fontSize="20px">Create a new activity...</Heading>
			<FormControl isInvalid={Boolean(errors.title)} width="100%" display="flex" flexDirection="column">
				<Flex flexDirection="row" alignItems="center">
					<Text fontWeight="bold" width="20%">
						Title:
					</Text>
					<Input {...register('title', { required: 'Please insert a title' })} width="80%" />
				</Flex>
				<FormErrorMessage justifyContent="end">{errors.title?.message}</FormErrorMessage>
			</FormControl>

			<Flex flexDirection="row" gap="8px" justifyContent="end">
				{!showActivityLinkInput && (
					<>
						<Text>Add an activity link?</Text>
						<Checkbox
							onChange={() => {
								console.log(showActivityLinkInput);
								setShowActivityLinkInput(true);
							}}
						/>
					</>
				)}

				{showActivityLinkInput && (
					<FormControl>
						<Flex alignItems="center" justifyContent="end" gap="8px">
							<InputGroup width="80%">
								<InputLeftAddon>
									<LinkIcon />
								</InputLeftAddon>
								<Input {...register('activityUrl')} />
								<InputRightElement>
									<SmallCloseIcon
										onClick={() => {
											setShowActivityLinkInput(false);
										}}
									/>
								</InputRightElement>
							</InputGroup>
						</Flex>
					</FormControl>
				)}
			</Flex>
			<FormControl display="flex" flexDirection="row" alignItems="center">
				<Text fontWeight="bold" width="20%">
					Date:
				</Text>
				<Input {...register('date')} width="80%" placeholder="DD/MM/YYYY" />
			</FormControl>
			<FormControl display="flex" flexDirection="row" alignItems="center">
				<Text fontWeight="bold" width="20%">
					Location:
				</Text>
				<Input {...register('location')} width="80%" />
			</FormControl>
			<Flex flexDirection="row" gap="8px" justifyContent="end">
				{!showLocationLinkInput && (
					<>
						<Text>Add a location link?</Text>
						<Checkbox
							onChange={() => {
								console.log(showLocationLinkInput);
								setShowLocationLinkInput(true);
							}}
						/>
					</>
				)}

				{showLocationLinkInput && (
					<FormControl>
						<Flex alignItems="center" justifyContent="end" gap="8px">
							<InputGroup width="80%">
								<InputLeftAddon>
									<LinkIcon />
								</InputLeftAddon>
								<Input {...register('locationUrl')} />
								<InputRightElement>
									<SmallCloseIcon
										onClick={() => {
											setShowLocationLinkInput(false);
										}}
									/>
								</InputRightElement>
							</InputGroup>
						</Flex>
					</FormControl>
				)}
			</Flex>
			<FormControl display="flex" flexDirection="row" alignItems="center">
				<Text fontWeight="bold" width="20%">
					Cost:
				</Text>

				<InputGroup width="80%">
					<InputLeftElement>$</InputLeftElement>
					<Input {...register('cost')} />
				</InputGroup>
			</FormControl>
			<FormControl>
				<Text fontWeight="bold">Description:</Text>
				<Textarea {...register('description')} />
			</FormControl>
			<FormControl display="flex" justifyContent="end">
				<Button type="submit" onClick={handleSubmit(submitActivity)}>
					Submit
				</Button>
			</FormControl>
		</chakra.form>
	);
}

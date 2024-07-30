'use client';

import { keys, swrKeys } from '@/fetchers/keys';
import { createTrip } from '@/fetchers/mutators';
import { ITripSummary } from '@/typings/trip';
import { CalendarIcon } from '@chakra-ui/icons';
import { chakra, FormControl, Flex, Input, FormErrorMessage, Button, Text, InputGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

interface ITripCreateFormProps extends ITripSummary {}

interface ITripFormProps {
	cnt: number;
	setCnt: (cnt: number) => void;
	onSubmit: () => void;
}

export function TripForm({ onSubmit, cnt, setCnt }: ITripFormProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ITripSummary>({ mode: 'onChange' });
	const { trigger } = useSWRMutation(swrKeys.trips(''), createTrip);

	async function onFormSubmit(data: ITripCreateFormProps) {
		console.log(data);
		console.log('cnt', cnt);
		const newTrip: ITripSummary = {
			title: data.title,
			startDate: '6/3/2008',
			endDate: '14/3/2008',
			destination: data.destination,
			titleImage: keys.randomImage(`${cnt + 283}`),
		};
		setCnt(cnt + 1);
		await trigger(newTrip);
		console.log('predao', newTrip);
		onSubmit();
	}

	return (
		<chakra.form display="flex" flexDirection="column" gap="16px" onSubmit={handleSubmit(onFormSubmit)}>
			<FormControl isInvalid={Boolean(errors.title)}>
				<Flex flexWrap="wrap" alignItems="center" justifyContent="space-between">
					<Text fontWeight="bold" marginRight="8px">
						Title:
					</Text>
					<Input width="70%" {...register('title', { required: 'Please provide the title' })} />
				</Flex>
				<FormErrorMessage justifyContent="end"> {errors.title?.message} </FormErrorMessage>
			</FormControl>

			<FormControl>
				<InputGroup alignItems="center" justifyContent="space-between">
					<Text fontWeight="bold" marginRight="8px">
						Destination:
					</Text>
					<Input width="70%" {...register('destination')} />
				</InputGroup>
			</FormControl>

			<Flex>
				<FormControl>
					<InputGroup alignItems="center">
						<Text fontWeight="bold" marginRight="8px">
							Start:
						</Text>
						<CalendarIcon />
					</InputGroup>
				</FormControl>

				<FormControl>
					<InputGroup alignItems="center">
						<Text fontWeight="bold" marginRight="8px">
							End:
						</Text>
						<CalendarIcon />
					</InputGroup>
				</FormControl>
			</Flex>

			<FormControl>
				<Button type="submit" backgroundColor="blue.300" borderRadius="full">
					Create
				</Button>
			</FormControl>
		</chakra.form>
	);
}

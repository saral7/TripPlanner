'use client';

import { ITripSummary } from '@/typings/trip';
import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import {
	Button,
	Input,
	InputGroup,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	useDisclosure,
	useFormControl,
	Text,
	Flex,
	FormControl,
	FormErrorMessage,
	chakra,
} from '@chakra-ui/react';
import { TripForm } from '../TripForm/TripForm';

interface ITripCreateModal {
	cnt: number;
	setCnt: (cnt: number) => void;
}

export function TripCreateModal({ cnt, setCnt }: ITripCreateModal) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button backgroundColor="blue.300" borderRadius="full" onClick={onOpen}>
				<AddIcon marginRight="8px" /> Create
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Create a new adventure...</ModalHeader>
					<ModalBody>
						<TripForm cnt={cnt} setCnt={setCnt} onSubmit={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

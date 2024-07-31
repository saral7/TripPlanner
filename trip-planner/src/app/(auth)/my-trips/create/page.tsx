'use client';

import { Calendar } from '@/components/features/Calendar/Calendar';
import { MonthBox } from '@/components/features/Calendar/components/MonthBox/MonthBox';
import { TripForm } from '@/components/features/Trip/TripForm/TripForm';
import { Box } from '@chakra-ui/react';

export default function CreatePage() {
	const date = new Date(Date.now());
	return <MonthBox />;
}

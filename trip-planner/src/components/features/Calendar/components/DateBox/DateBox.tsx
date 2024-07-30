import { Box } from '@chakra-ui/react';

export function DateBox(date: Date) {
	return <Box>{`${date.getDay()}`}</Box>;
}

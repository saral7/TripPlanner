"use client";

import { Text, Card, CardHeader, Flex } from "@chakra-ui/react";

export function SidebarNavigation() {
	return (
		<Flex direction="column" justifyContent="space-between">
			<Flex direction="column" justifyContent="space-between">
				<Text> Previous... </Text>
				<Card>
					<CardHeader> France </CardHeader>
				</Card>
			</Flex>
			<Flex direction="column" justifyContent="space-between">
				<Text> Popular destinations... </Text>
				<Card>
					<CardHeader> Spain </CardHeader>
				</Card>
			</Flex>
		</Flex>
	);
}

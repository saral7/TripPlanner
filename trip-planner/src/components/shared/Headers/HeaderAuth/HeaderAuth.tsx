import { Avatar, AvatarBadge, Flex, Text } from "@chakra-ui/react";

export function HeaderAuth() {
	return (
		<Flex justifyContent="space-between">
			<Text>MyTripPlanner</Text>
			<Flex>
				<Text>Nesto</Text>
				<Avatar name="Sara" />
			</Flex>
		</Flex>
	);
}

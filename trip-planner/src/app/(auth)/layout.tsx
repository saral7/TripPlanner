import { SidebarNavigation } from '@/components/shared/SidebarNavigation/SidebarNavigation';
import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function LayoutAuth({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Flex justifyContent="space-between">
			<SidebarNavigation />
			<Flex width="70vw" padding="32px">
				{children}
			</Flex>
		</Flex>
	);
}

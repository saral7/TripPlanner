import { Grid, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function MonthBox() {
	return (
		<Table>
			<Thead>
				<Tr>
					{days.map((value, index) => {
						return <Td key={index}>{value}</Td>;
					})}
				</Tr>
			</Thead>
			<Tbody>
				{Array.from(Array(5)).map((i) => {
					return (
						<Tr key={i}>
							{days.map((value, j) => {
								return <Td key={i * 5 + j}>{j}</Td>;
							})}
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
}

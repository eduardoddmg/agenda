import {
  TableContainer,
  Table as TableChakra,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";

export const Table = ({ header, children }) => {
  return (
    <TableContainer>
      <TableChakra variant="simple">
        <Thead>
          <Tr>
            {header.map((item, index) => (
              <Th>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </TableChakra>
    </TableContainer>
  );
};

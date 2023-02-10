import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpaceBetween = styled(Row)`
  justify-content: space-between;
`;

/**
 * Flex defines flexbox layouts for flex-direction: row, column and justify-content: space-between
 */
export const Flex = Object.assign(Row, {
  Column,
  SpaceBetween,
});

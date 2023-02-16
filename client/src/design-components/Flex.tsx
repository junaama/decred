import styled, { CSSObject } from "styled-components";

type Props = {
  cssStyles?: CSSObject;
};

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  ${(props) => props.cssStyles};
`;
const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  ${(props) => props.cssStyles};
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

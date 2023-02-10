import styled from "styled-components";

type BodyProps = {
  size: number;
  color: "gray" | "black";
};
const defaultBodyAttrs = {
  size: 16,
  color: "black",
};
const Body = styled.div.attrs<BodyProps>(defaultBodyAttrs)<BodyProps>`
  color: ${(props) => (props.color === "gray" ? "#717171" : "black")};
  font-size: ${(props) => props.size ?? 16}px;
`;

type HeadingProps = {
  size: number;
  weight?: 600 | 700;
};
const defaultHeadingAttrs = {
  size: 20,
  weight: 600,
};
const Heading = styled.div.attrs<HeadingProps>(
  defaultHeadingAttrs
)<HeadingProps>`
  color: black;
  font-size: ${(props) => props.size ?? 20}px;
  font-weight: ${(props) => props.weight ?? 600};
`;

type InfoProps = {
  size: number;
  weight?: 600 | 700;
};
const defaultInfoAttrs = {
  size: 16,
  weight: 600,
};
const Info = styled.div.attrs<InfoProps>(defaultInfoAttrs)<InfoProps>`
  color: #717171;
  font-size: ${(props) => props.size ?? 16}px;
  font-weight: ${(props) => props.weight ?? 600};
`;
/**
 * Body is used for regular text, can be gray, black, any font size
 * 
 * Info is used for non-interative text, gray, semibold, bold, 16px, 20px
 * 
 * Heading is used for product headings, black, bold, 20px, 24px, 32px
 * 
 * Usage: <Text.Body size={16} color="black">Hello World</Text.Body>
 */
export const Text = Object.assign(Body, {
  Heading,
  Info,
});

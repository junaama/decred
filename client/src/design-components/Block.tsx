import styled from "styled-components";

type DefaultProps = {
  width: number | "auto";
  height: number | "auto";
  radius?: number;
};
type Default = DefaultProps & { color?: string };
type OutlineProps = DefaultProps & { spacing?: number };
const defaultAttrs = {
  radius: 8,
};
const defaultOutlineAttrs = {
  radius: 12,
  spacing: 10,
};
const Default = styled.div.attrs<Default>(defaultAttrs)<Default>`
  background-color: ${(props) => props.color ?? "#DFCFBE"};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.radius}px;
  padding: 8px;
`;
const Outline = styled.div.attrs<OutlineProps>(
  defaultOutlineAttrs
)<OutlineProps>`
  border: 1px solid black;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.radius}px;
  padding: ${(props) => props.spacing}px;
`;

/**
 * Block is used for a container of content, can be any width, height, background color, border/borderless
 *
 * Usage:
 * Example: <Block width={220} height={320}/>
 * Example: <Block.Outline width={100} height={100} radius={8} />
 */
export const Body = Object.assign(Default, {
  Outline,
});

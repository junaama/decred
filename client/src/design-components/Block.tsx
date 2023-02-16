import styled from "styled-components";
import { Flex } from "./Flex";

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

const Default = styled.div.attrs<Default>(defaultAttrs)<Default>`
  background-color: ${(props) => props.color ?? "#DFCFBE"};
  width: ${(props) => (props.width === "auto" ? "auto" : `${props.width}px`)};
  height: ${(props) =>
    props.height === "auto" ? "auto" : `${props.height}px`};
  min-width: ${(props) =>
    props.width === "auto" ? "auto" : `${props.width}px`};
  min-height: ${(props) =>
    props.height === "auto" ? "auto" : `${props.height}px`};
  border-radius: ${(props) => props.radius}px;
  padding: 8px;
`;
const Outline = styled.div<OutlineProps>`
  border: 1px solid black;
  width: ${(props) => (props.width === "auto" ? "auto" : `${props.width}px`)};
  height: ${(props) =>
    props.height === "auto" ? "auto" : `${props.height}px`};
  min-width: ${(props) =>
    props.width === "auto" ? "auto" : `${props.width}px`};
  min-height: ${(props) =>
    props.height === "auto" ? "auto" : `${props.height}px`};
  border-radius: ${(props) => (props.radius ? props.radius : 12)}px;
  padding: ${(props) => (props.spacing ? props.spacing : 10)}px;
`;
const FlexBlock = styled(Flex)<Default>`
  background-color: ${(props) => props.color ?? "#DFCFBE"};
  width: ${(props) => (props.width === "auto" ? "auto" : `${props.width}px`)};
  height: ${(props) =>
    props.height === "auto" ? "auto" : `${props.height}px`};
  min-width: ${(props) =>
    props.width === "auto" ? "auto" : `${props.width}px`};
  min-height: ${(props) =>
    props.height === "auto" ? "auto" : `${props.height}px`};
  border-radius: ${(props) => props.radius}px;
  padding: 8px;
`;
/**
 * Block is used for a container of content, can be any width, height, background color, border/borderless
 *
 * Usage:
 * Example: <Block width={220} height={320}/>
 * Example: <Block.Outline width={100} height={100} radius={8} />
 * Example: <Block.FlexBlock width={100} height={100} radius={8} />
 */
export const Block = Object.assign(Default, {
  Outline,
  FlexBlock,
});

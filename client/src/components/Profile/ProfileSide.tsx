import { Block } from "@/design-components/Block";
import { Flex } from "@/design-components/Flex";
import { Text } from "@/design-components/Text";

export const ProfileSide = () => {
  return (
    <Block.Outline width={330} height={575}>
      <ProfileIcon />
      <Text.Heading size={24}></Text.Heading>
      <Flex.Column>
        <Flex>
          <FarcasterLink />
          <Text.Info size={16} weight={600}></Text.Info>
        </Flex>
        <Flex>
          <LensLink />
          <Text.Info size={16} weight={600}></Text.Info>
        </Flex>
      </Flex.Column>
      <Flex>
        <Block height={28} width="auto">
          <Text color="black" size={16}></Text>
        </Block>
        <Block height={28} width="auto">
          <Text color="black" size={16}></Text>
        </Block>
      </Flex>
    </Block.Outline>
  );
};

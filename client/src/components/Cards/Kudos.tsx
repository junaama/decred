import { Block } from "@/design-components/Block";
import { Text } from "@/design-components/Text";
import { Flex } from "@/design-components/Flex";
import Image from "next/image";

type Props = {
  headline: string;
  assetUrl: string;
  holderAmount: string;
  communityName: string;
};

export const Kudos = ({
  headline,
  assetUrl,
  holderAmount,
  communityName,
}: Props) => {
  return (
    <Block.Outline width={260} height={175}>
      <Flex>
        <Block width={80} height={80}>
          <Image alt="headline" src={assetUrl} width={80} height={80} />
        </Block>
        <Text.Heading size={20}>{headline}</Text.Heading>
      </Flex>
      <Flex.Column>
        <Text.Info size={16}>{holderAmount} holders</Text.Info>
        <Block height={28} width="auto">
          <Text color="black" size={16}>
            {communityName}
          </Text>
        </Block>
      </Flex.Column>
    </Block.Outline>
  );
};

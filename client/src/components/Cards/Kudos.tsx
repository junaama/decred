import { Block } from "@/design-components/Block";
import { Text } from "@/design-components/Text";
import { Flex } from "@/design-components/Flex";
import Image from "next/image";
import styled from "styled-components";

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
      <Flex cssStyles={{ gap: "8px" }}>
        {assetUrl ? (
          <Block width={80} height={80}>
            <Image alt="headline" src={assetUrl} width={80} height={80} />
          </Block>
        ) : (
          <DefaultImage />
        )}

        <Text.Heading color="black" size={20}>
          {headline}
        </Text.Heading>
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

const DefaultImage = styled.div`
  min-width: 80px;
  min-height: 80px;
  border-radius: 8px;
  background: linear-gradient(180deg, #dfcfbe 0%, #c6b5f2 100%);
`;

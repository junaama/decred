import { Block } from "@/design-components/Block";
import { Flex } from "@/design-components/Flex";
import { Text } from "@/design-components/Text";
import Link from "next/link";
import styled from "styled-components";

type Info = {
  href: string;
  name: string;
};

type Props = {
  profileName: string;
  farcaster: Info & { followers: number };
  lens: Info & { followers: number };
  profileImage: string;
  communities: Info[];
};

export const ProfileSide = ({
  profileName,
  farcaster,
  lens,
  profileImage,
  communities,
}: Props) => {
  return (
    <Block.Outline width={330} height={500} spacing={20}>
      <Flex.Column cssStyles={{ gap: "16px" }}>
        <ProfileBlock src={profileImage} width={150} height={150} />
        <Text.Heading color="black" size={24}>
          {profileName}
        </Text.Heading>
        <Flex.Column>
          <Flex cssStyles={{ gap: "8px" }}>
            <Link href={farcaster.href}>
              <Text.Heading color="black" size={16}>
                @{farcaster.name}
              </Text.Heading>
            </Link>
            <Text.Info size={16} weight={600}>
              {farcaster.followers} followers
            </Text.Info>
          </Flex>
          <Flex cssStyles={{ gap: "8px" }}>
            <Link href={lens.href}>
              <Text.Heading color="black" size={16}>
                {lens.name}
              </Text.Heading>
            </Link>
            <Text.Info size={16} weight={600}>
              {lens.followers} followers
            </Text.Info>
          </Flex>
        </Flex.Column>
        <Flex cssStyles={{ gap: "16px" }}>
          {communities.map((community) => (
            <Block.FlexBlock
              height={28}
              width="auto"
              radius={8}
              cssStyles={{ alignItems: "center" }}
            >
              <Text color="black" size={16}>
                {community.name}
              </Text>
            </Block.FlexBlock>
          ))}
        </Flex>
      </Flex.Column>
    </Block.Outline>
  );
};

const DEFAULT_PROPS = {
  profileName: "JohnDoe.eth",
  farcaster: {
    href: "https://farcaster.com",
    name: "johndoe",
    followers: 100,
  },
  lens: {
    href: "https://lens.farcaster.com",
    name: "johndoe.lens",
    followers: 100,
  },
  profileImage: "https://avatars.githubusercontent.com/u/1021101?v=4",
  communities: [
    {
      href: "https://gitcoin.co",
      name: "Gitcoin",
    },
    {
      href: "https://gitcoin.co",
      name: "Gitcoin",
    },
  ],
};

ProfileSide.defaultProps = DEFAULT_PROPS;

const ProfileBlock = styled.img`
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
`;

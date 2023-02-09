import styled from "styled-components";
import Image from "next/image";

type Profile = {
  displayName: string;
  profileImage: string;
  lensFollowers: number;
  farcasterFollowers: number;
  gitPoapsCount: number;
  poapsCount: number;
  kudosCount: number;
  affiliations: string[];
};

export const ProfileContainer = ({
  displayName,
  profileImage,
  lensFollowers,
  farcasterFollowers,
  gitPoapsCount,
  poapsCount,
  kudosCount,
  affiliations,
}: Profile) => {
  return (
    <Container>
      <div>
        {profileImage ? (
          <Image
            alt="profile-image"
            src={profileImage}
            width={150}
            height={150}
          />
        ) : (
          <DefaultImage />
        )}
      </div>
      <InfoContainer>
        <Heading>
          <HeadingName>{displayName}</HeadingName>
          {lensFollowers ? <Text>Lens Followers: {lensFollowers}</Text> : <></>}
          {farcasterFollowers ? (
            <>
              <Image
                alt="farcaster logo"
                src="/farcaster-logo.png"
                width={32}
                height={32}
              />
              <Text>{farcasterFollowers}</Text>
            </>
          ) : (
            <></>
          )}
        </Heading>
        <Heading>
          {affiliations.map((affiliation) => (
            <Text>{affiliation}</Text>
          ))}
        </Heading>
        <Column>
          {gitPoapsCount ? <Text>GitPoaps: {gitPoapsCount}</Text> : <></>}
          {kudosCount ? <Text>BuildSpace: {kudosCount}</Text> : <></>}
          {poapsCount ? <Text>POAPs: {poapsCount}</Text> : <></>}
        </Column>
      </InfoContainer>
    </Container>
  );
};
const dummyProfiles: Profile[] = [
  {
    displayName: "naama.eth",
    profileImage: "/profilepic.png",
    lensFollowers: 10,
    farcasterFollowers: 100,
    gitPoapsCount: 0,
    poapsCount: 30,
    kudosCount: 0,
    affiliations: ["Developer DAO", "Gitcoin", "Boys Club", "OpenSea"],
  },
  {
    displayName: "pistachiomilk.eth",
    profileImage: "",
    lensFollowers: 0,
    farcasterFollowers: 3,
    gitPoapsCount: 0,
    poapsCount: 130,
    kudosCount: 0,
    affiliations: ["OpenSea", "ETHGlobal", "Pudgy Penguins"],
  },
];
ProfileContainer.defaultProps = dummyProfiles[0];

const Container = styled.div`
  display: flex;
  border-radius: 12px;
  border: 1px solid black;
  padding: 16px;
  gap: 16px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;
const Heading = styled.div`
  display: flex;
  gap: 12px;
`;
const Column = styled(Heading)`
  flex-direction: column;
`;
const HeadingName = styled.h4`
  font-weight: 600;
`;

const Text = styled.p`
  font-size: 16px;
`;
const DefaultImage = styled.div`
  width: 150px;
  height: 150px;
  background: linear-gradient(180deg, #dfcfbe 0%, #c6b5f2 100%);
`;

import styled from "styled-components";
import Image from "next/image";

type Profile = {
  displayName: string;
  profileImage: string;
  lensFollowers: number;
  farcasterFollowers: number;
  gitPoapsCount: number;
  buildSpaceCount: number;
  poapsCount: number;
  affiliations: string[];
};
const dummyProfiles: Profile[] = [
  {
    displayName: "naama.eth",
    profileImage: "/profilepic.png",
    lensFollowers: 10,
    farcasterFollowers: 100,
    gitPoapsCount: 0,
    buildSpaceCount: 2,
    poapsCount: 30,
    affiliations: ["Developer DAO", "Gitcoin", "Boys Club", "OpenSea"],
  },
  {
    displayName: "pistachiomilk.eth",
    profileImage: "",
    lensFollowers: 0,
    farcasterFollowers: 3,
    gitPoapsCount: 0,
    buildSpaceCount: 0,
    poapsCount: 130,
    affiliations: ["OpenSea", "ETHGlobal", "Pudgy Penguins"],
  },
];
export const ProfileContainer = (profile: Profile) => {
  return (
    <Container>
      <div>
        {profile.profileImage ? (
          <Image
            alt="profile-image"
            src={profile.profileImage}
            width={150}
            height={150}
          />
        ) : (
          <DefaultImage />
        )}
      </div>
      <InfoContainer>
        <Heading>
          <HeadingName>{profile.displayName}</HeadingName>
          {profile.lensFollowers ? (
            <Text>Lens Followers: {profile.lensFollowers}</Text>
          ) : (
            <></>
          )}
          {profile.farcasterFollowers ? (
            <Text>Farcaster Followers: {profile.farcasterFollowers}</Text>
          ) : (
            <></>
          )}
        </Heading>
        <Heading>
          {profile.affiliations.map((affiliation) => (
            <Text>{affiliation}</Text>
          ))}
        </Heading>
        <Column>
          {profile.gitPoapsCount ? (
            <Text>GitPoaps: {profile.gitPoapsCount}</Text>
          ) : (
            <></>
          )}
          {profile.buildSpaceCount ? (
            <Text>BuildSpace: {profile.buildSpaceCount}</Text>
          ) : (
            <></>
          )}
          {profile.poapsCount ? (
            <Text>POAPs: {profile.poapsCount}</Text>
          ) : (
            <></>
          )}
        </Column>
      </InfoContainer>
    </Container>
  );
};

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

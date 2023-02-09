import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { ProfileContainer } from "@/components/Profile/ProfileContainer";

const PROFILE_DATA = gql`
  query ProfileQuery($address: String!) {
    poapsFromAddress(address: $address) {
      event {
        fancy_id
        name
        image_url
      }
    }
    gitPoapsFromAddress(address: $address) {
      imageUrl
      poapEventFancyId
      name
      imageUrl
    }
    farcasterUserFromAddress(address: $address) {
      result {
        user {
          displayName
          followerCount
          profile {
            bio {
              mentions
            }
          }
        }
      }
    }
    kudosFromAddress(address: $address) {
      data {
        assetUrl
        headline
      }
    }
  }
`;

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // validateProfileQuery(id)
  const { loading, error, data } = useQuery(PROFILE_DATA, {
    variables: { address: id },
  });
  const poapCount = data?.poapsFromAddress?.length;
  const gitPoapCount = data?.gitPoapsFromAddress?.length;
  const kudosCount = data?.kudosFromAddress?.data.length;
  const farcasterFollowerCount =
    data?.farcasterUserFromAddress?.result?.user?.followerCount;
  const poaps = data?.poapsFromAddress;
  const affiliations =
    data?.farcasterUserFromAddress?.result?.user?.profile.bio.mentions;
  const displayName = data?.farcasterUserFromAddress?.result?.user?.displayName;

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error</div>;

  return (
    <>
      <ProfileContainer
        farcasterFollowers={farcasterFollowerCount}
        poapsCount={poapCount}
        gitPoapsCount={gitPoapCount}
        kudosCount={kudosCount}
        affiliations={affiliations}
        displayName={displayName}
        profileImage=""
        lensFollowers={0}
      />
      Address: {id}
      <div>
        <p>Poaps</p>
        {poaps &&
          poaps.map((poap) => (
            <div>
              <img
                alt={poap.event.fancy_id}
                src={poap.event.image_url}
                width={32}
                height={32}
              />
              Name: {poap.event.name}
            </div>
          ))}
      </div>
    </>
  );
};
export default ProfilePage;

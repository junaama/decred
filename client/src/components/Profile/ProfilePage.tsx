import { useQuery, gql } from "@apollo/client";
import { ProfileContainer } from "@/components/Profile/ProfileContainer";
import { validateProfileQuery } from "./utils";

const dummyAddress = "0x75479B52c8ccBD74716fb3EA17074AAeF14c66a2";

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

`

const ProfilePage = (address: string) => {
    validateProfileQuery(address)
    const { loading, error, data } = useQuery(PROFILE_DATA, {
        variables: { address: address },
    });
    console.log("data: ", data)
    return (
        <>in profile</>
    )
}
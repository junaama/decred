import Head from "next/head";
import styled from "styled-components";
import { ProfileContainer } from "@/components/Profile/ProfileContainer";
import { Search } from "@/components/Search/Search";
import { useQuery, gql } from "@apollo/client";
import { Tabs } from "@/components/Tabs";
import { Kudos } from "@/components/Cards/Kudos";
import { ProfileSide } from "@/components/Profile/ProfileSide";
//   const GET_PROFILE = gql`
//   query GetProfile {
//     profile(request: {handle: "naama.lens"}) {
//       name
//       id
//       stats {
//         totalFollowers
//       }
//     }
//   }
// `
// const GET_DEFAULT = gql`
//     query GetDefaultProfile {
//     defaultProfile(request: {ethereumAddress: "0x75479B52c8ccBD74716fb3EA17074AAeF14c66a2"} )
//       {
//         name
//         stats {
//         totalFollowers
//         }

//       }
//     }

// `
export default function Home() {
  // const {loading, error, data} = useQuery(GET_DEFAULT)
  // console.log('data: ', data)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Header>Decred</Header>
          <Search />
          <Tabs />
          <ProfileContainer />
          <Kudos
            headline="WBW# Community Contributer"
            assetUrl=""
            holderAmount="95"
            communityName="Mint Kudos"
          />
          <ProfileSide />
        </div>
      </main>
    </>
  );
}

const Header = styled.h1`
  font-family: "Rubik Mono One", sans-serif;
`;

import * as dotenv from 'dotenv' 
dotenv.config()
import { ApolloServer } from "@apollo/server";
import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { startServerAndCreateNextHandler } from '@as-integrations/next';

interface ContextValue {
  dataSources: {
    gitPoapAPI: GitPoapAPI;
    mintKudosAPI: MintKudosAPI;
    farcasterAPI: FarcasterAPI;
    lensAPI: LensAPI;
    poapAPI: PoapAPI;
  };
}

const typeDefs = `#graphql
  type Account {
    address: String 
    ens: String
  }

  type GitPoap {
    gitPoapId: Int
    gitPoapEventId: Int
    poapTokenId: String
    poapEventId: Int
    poapEventFancyId: String
    name: String
    year: Int
    description: String
    imageUrl: String
    repositories: [String]
    earnedAt: String
    mintedAt: String
  }

  type Kudos {
      kudosTokenId: Int
    headline: String
    assetUrl: String
    createdAt: String
    claimStatus: String
    communityId: String
  }

  type MintKudos {
    limit: Int
    offset: Int
    data: [Kudos]
  }

  type Bio {
    text: String
    mentions: [String]
  }

  type FarcasterProfile {
    bio: Bio
  }
  type PFP {
    url: String
    verified: Boolean
  }
  type ViewerContext {
    following: Boolean
    followedBy: Boolean
    canSendDirectCasts: Boolean
  }
  type FCUser {
    fid: Int
    username: String
    displayName: String
    pfp: PFP
    profile: FarcasterProfile
    followerCount: Int
    followingCount: Int
    viewerContext: ViewerContext
  }

  type Result {
    user: FCUser
  }
  type FarcasterUser {
    result: Result
  }
  type Attribute  {
  displayType: String
  traitType: String
  key: String
  value: String
}
type Stats  {
  totalFollowers: Int
  totalFollowing: Int
  totalPosts: Int
  totalComments: Int
  totalMirrors: Int
  totalPublications: Int
  totalCollects: Int
}
type Image  {
  url: String
  mimeType: String
}
type Picture  {
  original: Image
}

type LensProfile {
  id: String
  name: String
  bio: String
  attributes: [Attribute]
  followNftAddress: String
  metadata: String
  isDefault: Boolean
  picture: Picture
  handle: String
  coverPicture: Picture
  ownedBy: String
  dispatcher: String
  stats: Stats
  followModule: String

}

type PoapEvent {
  id: Int
  fancy_id: String
  name: String
  event_url: String
  image_url: String
  country: String
  city: String
  description: String
  year: Int
  start_date: String
  end_date: String
  expiry_date: String
  supply: Int
}
type Poap {
  event: PoapEvent
  tokenId: String
  owner: String
  chain: String
  created: String
}
  type Query {
    account(address: String!): Account
    accounts: [Account]
    gitPoapsFromAddress(address: String!): [GitPoap]
    gitPoapsFromGithubUser(githubHandle: String!): [GitPoap]
    accountsFromGitPoap(gitPoapEventId: Int!): [Account]
    kudosFromAddress(address: String!): MintKudos
    farcasterUserFromAddress(address: String!): FarcasterUser
    lensProfileFromAddress(address: String!): LensProfile
    poapsFromAddress(address: String!): [Poap]
  }

`;
const users = [
  {
    address: "0x75479B52c8ccBD74716fb3EA17074AAeF14c66a2",
    ensAddress: "naama.eth",
  },
  {
    address: "0x2Ba62a52b9244b4E45Ba52cc0B1f8D39B522025D",
    ensAddress: "",
  },
];
type PoapEvent = {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  supply: number;
};

type Poap = {
  event: PoapEvent;
  tokenId: string;
  owner: string;
  chain: string;
  created: string;
};

type GitPoap = {
  gitPoapId: number;
  gitPoapEventId: number;
  poapTokenId: String;
  poapEventId: number;
  poapEventFancyId: String;
  name: String;
  year: number;
  description: String;
  imageUrl: String;
  repositories: [String];
  earnedAt: String;
  mintedAt: String;
};
type MintKudos = {
  kudosTokenId: number;
  headline: String;
  assetUrl: String;
  createdAt: String;
  claimStatus: String;
  communityId: String;
};
type Bio = {
  text: String;
  mentions: [String];
};

type FarcasterProfile = {
  bio: Bio;
};

type PFP = {
  url: String;
  verified: boolean;
};

type ViewerContext = {
  following: boolean;
  followedBy: boolean;
  canSendDirectCasts: boolean;
};
type FCUser = {
  fid: number;
  username: String;
  displayName: String;
  pfp: PFP;
  profile: FarcasterProfile;
  followerCount: number;
  followingCount: number;
  viewerContext: ViewerContext;
};

type Result = {
  user: FCUser;
};

type FarcasterUser = {
  result: Result;
};
type Attribute = {
  displayType: String;
  traitType: String;
  key: String;
  value: String;
};
type Stats = {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
};
type Image = {
  url: String;
  mimeType: String;
};
type Picture = {
  original: Image;
};
type LensProfile = {
  id: String;
  name: String;
  bio: String;
  attributes: [Attribute];
  followNftAddress: String;
  metadata: String;
  isDefault: boolean;
  picture: Picture;
  handle: String;
  coverPicture: Picture;
  ownedBy: String;
  dispatcher: String;
  stats: Stats;
  followModule: String;
};
class GitPoapAPI extends RESTDataSource {
  override baseURL = "https://public-api.gitpoap.io/";

  async getGitPoaps(address: string): Promise<GitPoap[]> {
    const data = await this.get<GitPoap[]>(`v1/address/${address}/gitpoaps`);
    return data;
  }
  async getAddressesFromGitPoap(gitPoapEventId: string): Promise<GitPoap[]> {
    const data = await this.get<GitPoap[]>(
      `v1/gitpoaps/${gitPoapEventId}/addresses`
    );
    return data;
  }
  async getGitPoapsFromGithubUser(
    githubHandle: string,
    status: string
  ): Promise<GitPoap[]> {
    const data = await this.get<GitPoap[]>(
      `v1/github/user/${githubHandle}/gitpoaps?status=${status}`
    );
    return data;
  }
}

class MintKudosAPI extends RESTDataSource {
  override baseURL = "https://api.mintkudos.xyz/v1/";
  async getKudosFromAddress(
    address: string,
    status: string
  ): Promise<MintKudos> {
    const data = await this.get<MintKudos>(
      `wallets/${address}/tokens?claimStatus=${status}`
    );
    return data;
  }
}

class FarcasterAPI extends RESTDataSource {
  override baseURL = "https://api.farcaster.xyz/v2/";
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["Authorization"] = `Bearer ${this.token}`;
  }

  async getFarcasterUser(address: string): Promise<FarcasterUser> {
    const data = await this.get<FarcasterUser>(
      `user-by-verification?address=${address}`
    );
    return data;
  }
}

class LensAPI extends RESTDataSource {
  override baseURL = "https://api.lens.dev/";

  async getLensProfile(address: string): Promise<LensProfile> {
    const data = await this.get<LensProfile>(`profile/${address}`);
    return data;
  }
}
class PoapAPI extends RESTDataSource {
  override baseURL = "https://api.poap.tech/";
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }
  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["x-api-key"] = this.token
  }
  async getPoaps(address: string): Promise<Poap[]> {
    const data = await this.get<Poap[]>(`actions/scan/${address}`, {headers: {
      "x-api-key": this.token
    }});
    return data;
  }
}
const resolvers = {
  Query: {
    accounts: () => users,
    // @ts-ignore
    account: (_, args) => users.filter((user) => user.address === args.address),
    // @ts-ignore
    gitPoapsFromAddress: async (_, { address }, { dataSources }) =>
      dataSources.gitPoapAPI.getGitPoaps(address),
    // @ts-ignore
    gitPoapsFromGithubUser: async (_, { githubHandle }, { dataSources }) =>
      dataSources.gitPoapAPI.getGitPoapsFromGithubUser(githubHandle, "claimed"),
    // @ts-ignore
    accountsFromGitPoap: async (_, { gitPoapEventId }, { dataSources }) =>
      dataSources.gitPoapAPI.getAddressesFromGitPoap(gitPoapEventId),
    // @ts-ignore
    kudosFromAddress: async (_, { address }, { dataSources }) =>
      dataSources.mintKudosAPI.getKudosFromAddress(address, "claimed"),
    // @ts-ignore
    farcasterUserFromAddress: async (_, { address }, { dataSources }) =>
      dataSources.farcasterAPI.getFarcasterUser(address),
    // @ts-ignore
    lensProfileFromAddress: async (_, { address }, { dataSources }) =>
      dataSources.lensAPI.getLensProfile(address),
    // @ts-ignore
    poapsFromAddress: async (_, { address }, { dataSources }) =>
      dataSources.poapAPI.getPoaps(address),
  },
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const fcKey = process.env.FARCASTER_KEY
const poapKey = process.env.POAP_KEY

export default startServerAndCreateNextHandler<ContextValue>(server, {
  context: async (req,res) => {
    const { cache } = server;
    const fcOptions = {token: fcKey, cache}
    return {
      dataSources: {
        gitPoapAPI: new GitPoapAPI({ cache }),
        mintKudosAPI: new MintKudosAPI({ cache }),
        farcasterAPI: new FarcasterAPI(fcOptions),
        lensAPI: new LensAPI({ cache }),
        poapAPI: new PoapAPI({token:poapKey, cache}),
      },
    };
  },
})
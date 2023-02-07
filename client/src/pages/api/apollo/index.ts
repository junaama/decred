import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

interface ContextValue {
  dataSources: {
    gitPoapAPI: GitPoapAPI;
    mintKudosAPI: MintKudosAPI;
    farcasterAPI: FarcasterAPI;
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

  type Query {
    account(address: String!): Account
    accounts: [Account]
    gitPoapsFromAddress(address: String!): [GitPoap]
    gitPoapsFromGithubUser(githubHandle: String!): [GitPoap]
    accountsFromGitPoap(gitPoapEventId: Int!): [Account]
    kudosFromAddress(address: String!): MintKudos
    farcasterUserFromAddress(address: String!): FarcasterUser
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

type MintKudos = {
  kudosTokenId: number;
  headline: String;
  assetUrl: String;
  createdAt: String;
  claimStatus: String;
  communityId: String;
};

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

class FarcasterAPI extends RESTDataSource {
  override baseURL = "https://api.farcaster.xyz/v2/";
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["authorization"] = this.token;
  }

  async getFarcasterUser(address: string): Promise<FarcasterUser> {
    const data = await this.get<FarcasterUser>(
      `user-by-verification?address=${address}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
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
  },
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});
const fcKey = process.env.FARCASTER_KEY;
const { url } = await startStandaloneServer(server, {
  listen: { port: 4500 },
  context: async () => {
    const { cache } = server;
    const token = fcKey;
    const options = { token, cache };
    return {
      token,
      dataSources: {
        gitPoapAPI: new GitPoapAPI({ cache }),
        mintKudosAPI: new MintKudosAPI({ cache }),
        farcasterAPI: new FarcasterAPI(options),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);

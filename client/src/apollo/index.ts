import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { RESTDataSource } from "@apollo/datasource-rest";

interface ContextValue {
  dataSources: {
    gitPoapAPI: GitPoapAPI;
    mintKudosAPI: MintKudosAPI;
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

  type Query {
    account(address: String!): Account
    accounts: [Account]
    gitPoapsFromAddress(address: String!): [GitPoap]
    gitPoapsFromGithubUser(githubHandle: String!): [GitPoap]
    accountsFromGitPoap(gitPoapEventId: Int!): [Account]
    kudosFromAddress(address: String!): MintKudos
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
  async getKudosFromAddress(address: string, status: string): Promise<MintKudos> {
    const data = await this.get<MintKudos>(`wallets/${address}/tokens?claimStatus=${status}`);
    return data;
  }
}

const resolvers = {
  Query: {
    accounts: () => users,
    // @ts-ignore
    account: (_, args) =>
      users.filter((user) => user.address === args.address),
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
  },
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        gitPoapAPI: new GitPoapAPI({ cache }),
        mintKudosAPI: new MintKudosAPI({ cache }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);

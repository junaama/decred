declare namespace NodeJS {
  export interface ProcessEnv {
    readonly FARCASTER_KEY: string;
    readonly NEXT_PUBLIC_FARCASTER_KEY: string;
    readonly POAP_KEY: string;
  }
}

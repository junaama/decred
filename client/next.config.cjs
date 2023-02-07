/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {appDir: true},
  webpack(config){
    config.experiments = {...config.experiments, topLevelAwait: true}
    return config;
  },
  compiler: {
    styledComponents: boolean | {
      displayName: boolean,
      ssr: boolean,
      fileName: boolean,
    }
  }
}


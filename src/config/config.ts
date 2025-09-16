interface Config {
  port: number;
  nodeEnv: string;
  jwt_access_token: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt_access_token: String(process.env.JWT_ACCESS_TOKEN),

};

export default config;

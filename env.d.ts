declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: "development" | "production";
      DATABASE: string;
      JWT_SECRET: string;
      EXPIRE_TOKEN: number;
      STRIPE_SECRET_KEY: string;
    }
  }
}

export {};

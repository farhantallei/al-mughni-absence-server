import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN: string;
      PORT: number;
    }
  }
}

export const DOMAIN = process.env.DOMAIN;
export const PORT = process.env.PORT;

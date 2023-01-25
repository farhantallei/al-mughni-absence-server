import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: number;
    }
  }
}

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;

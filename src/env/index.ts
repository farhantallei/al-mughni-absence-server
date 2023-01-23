import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
    }
  }
}

export const PORT = process.env.PORT;

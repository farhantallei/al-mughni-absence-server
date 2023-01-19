import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const RegisterSchema = {
  body: Type.Object({
    username: DataType.string,
    name: DataType.string,
  }),
  response: {
    201: Type.Object({
      id: DataType.id,
      username: DataType.string,
      name: DataType.string,
    }),
  },
};

export type RegisterTSchema = typeof RegisterSchema;

export const LoginSchema = {
  body: Type.Object({
    username: DataType.string,
  }),
  response: {
    200: Type.Object({
      id: DataType.id,
      username: DataType.string,
      name: DataType.string,
    }),
  },
};

export type LoginTSchema = typeof LoginSchema;

export const ValidationSchema = {
  params: Type.Object({ username: DataType.string }),
  response: {
    200: Type.Object({
      id: DataType.id,
      username: DataType.string,
      name: DataType.string,
    }),
  },
};

export type ValidationTSchema = typeof ValidationSchema;

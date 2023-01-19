import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const GetPengajarSchema = {
  querystring: Type.Object({
    program: Type.String(),
  }),
  response: {
    200: Type.Array(
      Type.Object({
        id: DataType.id,
        username: DataType.string,
        name: DataType.string,
      })
    ),
  },
};

export type GetPengajarTSchema = typeof GetPengajarSchema;

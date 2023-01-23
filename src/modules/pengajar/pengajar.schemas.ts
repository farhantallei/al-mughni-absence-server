import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const GetPengajarSchema = {
  params: Type.Object({
    programId: DataType.id,
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

export const RegisterPelajarSchema = {
  body: Type.Object({
    pelajarId: DataType.id,
    pengajarId: DataType.id,
    programId: DataType.id,
  }),
  response: {
    201: Type.Object({
      pelajarId: DataType.id,
      pengajarId: DataType.id,
      programId: DataType.id,
      pengajarName: DataType.string,
      programStatus: Type.Union([
        Type.Literal('available'),
        Type.Literal('unavailable'),
        Type.Literal('alibi'),
      ]),
      reason: Type.Union([Type.String(), Type.Null()]),
    }),
  },
};

export type RegisterPelajarTSchema = typeof RegisterPelajarSchema;

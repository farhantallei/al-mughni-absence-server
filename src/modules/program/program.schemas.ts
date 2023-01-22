import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const GetProgramListSchema = {
  params: Type.Object({ pelajarId: DataType.id }),
  response: {
    200: Type.Array(
      Type.Object({
        id: DataType.id,
        pengajarId: Type.Union([DataType.id, Type.Null()]),
        name: Type.String(),
        individual: Type.Boolean(),
        pengajar: Type.Boolean(),
        presentStatus: Type.Union([
          Type.Literal('alpha'),
          Type.Literal('present'),
          Type.Literal('absent'),
        ]),
        programStatus: Type.Union([
          Type.Literal('available'),
          Type.Literal('unavailable'),
          Type.Literal('alibi'),
        ]),
        reason: Type.Union([Type.String(), Type.Null()]),
      })
    ),
  },
};

export type GetProgramListTSchema = typeof GetProgramListSchema;

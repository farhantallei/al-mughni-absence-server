import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const GetProgramListSchema = {
  params: Type.Object({ pelajarId: DataType.id }),
  response: {
    200: Type.Array(
      Type.Object({
        id: DataType.id,
        name: Type.String(),
        status: Type.Union([
          Type.Literal('alpha'),
          Type.Literal('present'),
          Type.Literal('absent'),
        ]),
        reason: Type.Union([Type.String(), Type.Null()]),
      })
    ),
  },
};

export type GetProgramListTSchema = typeof GetProgramListSchema;

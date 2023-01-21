import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const GetAbsentSchema = {
  querystring: Type.Object({
    pelajarId: DataType.id,
    programId: DataType.id,
    date: DataType.date,
  }),
  response: {
    200: Type.Union([
      Type.Object({
        id: DataType.id,
        pengajarId: Type.Union([DataType.id, Type.Null()]),
        programId: DataType.id,
        date: DataType.date,
        present: Type.Boolean(),
        reason: Type.Union([Type.String(), Type.Null()]),
      }),
      Type.Null(),
    ]),
  },
};

export type GetAbsentTSchema = typeof GetAbsentSchema;

export const AddAbsentSchema = {
  body: Type.Object({
    pelajarId: DataType.id,
    pengajarId: Type.Optional(DataType.id),
    programId: DataType.id,
    date: DataType.date,
    present: Type.Boolean(),
    reason: Type.Optional(DataType.string),
  }),
  response: {
    201: Type.Object({
      id: DataType.id,
      pengajarId: Type.Union([DataType.id, Type.Null()]),
      programId: DataType.id,
      date: DataType.date,
      present: Type.Boolean(),
      reason: Type.Union([Type.String(), Type.Null()]),
    }),
  },
};

export type AddAbsentTSchema = typeof AddAbsentSchema;

export const UpdateAbsentSchema = {
  body: Type.Object({
    pelajarId: DataType.id,
    pengajarId: Type.Optional(DataType.id),
    programId: DataType.id,
    date: DataType.date,
    present: Type.Boolean(),
    reason: Type.Optional(DataType.string),
  }),
  response: {
    200: Type.Object({
      id: DataType.id,
      pengajarId: Type.Union([DataType.id, Type.Null()]),
      programId: DataType.id,
      date: DataType.date,
      present: Type.Boolean(),
      reason: Type.Union([Type.String(), Type.Null()]),
    }),
  },
};

export type UpdateAbsentTSchema = typeof UpdateAbsentSchema;

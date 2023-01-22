import { Type } from '@sinclair/typebox';
import { DataType } from '../../types/data-type';

export const GetScheduleSchema = {
  querystring: Type.Object({
    pengajarId: DataType.id,
    programId: DataType.id,
    date: DataType.date,
  }),
  response: {
    200: Type.Union([
      Type.Object({
        id: DataType.id,
        pengajarId: DataType.id,
        programId: DataType.id,
        date: DataType.date,
        available: Type.Boolean(),
        reason: Type.Union([Type.String(), Type.Null()]),
      }),
      Type.Null(),
    ]),
  },
};

export type GetScheduleTSchema = typeof GetScheduleSchema;

export const AddScheduleSchema = {
  body: Type.Object({
    pengajarId: DataType.id,
    programId: DataType.id,
    date: DataType.date,
    available: Type.Boolean(),
    reason: Type.Optional(DataType.string),
  }),
  response: {
    201: Type.Object({
      id: DataType.id,
      pengajarId: DataType.id,
      programId: DataType.id,
      date: DataType.date,
      available: Type.Boolean(),
      reason: Type.Union([Type.String(), Type.Null()]),
    }),
  },
};

export type AddScheduleTSchema = typeof AddScheduleSchema;

export const UpdateScheduleSchema = {
  body: Type.Object({
    pengajarId: DataType.id,
    programId: DataType.id,
    date: DataType.date,
    available: Type.Boolean(),
    reason: Type.Optional(DataType.string),
  }),
  response: {
    200: Type.Object({
      id: DataType.id,
      pengajarId: DataType.id,
      programId: DataType.id,
      date: DataType.date,
      available: Type.Boolean(),
      reason: Type.Union([Type.String(), Type.Null()]),
    }),
  },
};

export type UpdateScheduleTSchema = typeof UpdateScheduleSchema;

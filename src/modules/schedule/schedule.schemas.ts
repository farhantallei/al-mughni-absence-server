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

export const GetAttendanceSchema = {
  params: Type.Object({
    pengajarId: DataType.id,
    programId: DataType.id,
  }),
  querystring: Type.Object({
    year: Type.Integer({ minimum: 1970, maximum: new Date().getFullYear() }),
    month: Type.Integer({ minimum: 0, maximum: 11 }),
  }),
  response: {
    200: Type.Array(
      Type.Object({
        date: Type.Integer({
          minimum: 1,
          maximum: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            0
          ).getDate(),
        }),
        available: Type.Union([DataType.string, Type.Boolean()]),
        attendances: Type.Array(
          Type.Object({
            id: DataType.id,
            username: DataType.string,
            name: DataType.string,
            attendance: Type.Union([DataType.string, Type.Boolean()]),
          })
        ),
      })
    ),
  },
};

export type GetAttendanceTSchema = typeof GetAttendanceSchema;

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

export const DeleteScheduleSchema = {
  body: Type.Object({
    pengajarId: DataType.id,
    programId: DataType.id,
    date: DataType.date,
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

export type DeleteScheduleTSchema = typeof DeleteScheduleSchema;

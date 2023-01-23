import { Type } from '@sinclair/typebox';

export const DataType = {
  id: Type.String(),
  string: Type.String({ minLength: 3 }),
  date: Type.String({ format: 'date' }),
  datetime: Type.String({ format: 'date-time' }),
};

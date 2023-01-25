import mongoose, {
  InferSchemaType,
  Schema,
  SchemaTypes,
  Types,
} from 'mongoose';

const pelajarSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
  },
  { collection: 'Pelajar' }
);

type PelajarInfer = InferSchemaType<typeof pelajarSchema>;
export interface Pelajar extends PelajarInfer {
  _id: Types.ObjectId;
}

export const Pelajar = mongoose.model('Pelajar', pelajarSchema);

const programSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    individual: { type: Boolean, default: false },
  },
  { collection: 'Program' }
);

type ProgramInfer = InferSchemaType<typeof programSchema>;
export interface Program extends ProgramInfer {
  _id: Types.ObjectId;
}

export const Program = mongoose.model('Program', programSchema);

const pengajarSchema = new Schema(
  {
    pelajarId: { type: SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    programId: { type: SchemaTypes.ObjectId, required: true, ref: 'Program' },
  },
  { collection: 'Pengajar' }
);
pengajarSchema.index({ pelajarId: 1, programId: 1 }, { unique: true });

export type PengajarInfer = InferSchemaType<typeof pengajarSchema>;
export interface Pengajar extends PengajarInfer {
  _id: Types.ObjectId;
}

export const Pengajar = mongoose.model('Pengajar', pengajarSchema);

const scheduleSchema = new Schema(
  {
    pengajarId: { type: SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    programId: { type: SchemaTypes.ObjectId, required: true, ref: 'Program' },
    date: { type: SchemaTypes.Date, required: true },
    available: { type: Boolean, required: true },
    reason: { type: String, default: null },
  },
  { collection: 'Schedule' }
);
scheduleSchema.index(
  { pengajarId: 1, programId: 1, date: 1 },
  { unique: true }
);

export type ScheduleInfer = InferSchemaType<typeof scheduleSchema>;
export interface Schedule extends ScheduleInfer {
  _id: Types.ObjectId;
}

export const Schedule = mongoose.model('Schedule', scheduleSchema);

const absentSchema = new Schema(
  {
    pelajarId: { type: SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    pengajarId: { type: SchemaTypes.ObjectId, ref: 'Pelajar' },
    programId: { type: SchemaTypes.ObjectId, required: true, ref: 'Program' },
    date: { type: SchemaTypes.Date, required: true },
    present: { type: Boolean, required: true },
    reason: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'Absent' }
);
absentSchema.index({ pelajarId: 1, programId: 1, date: 1 }, { unique: true });

export type AbsentInfer = InferSchemaType<typeof absentSchema>;
export interface Absent extends AbsentInfer {
  _id: Types.ObjectId;
}

export const Absent = mongoose.model('Absent', absentSchema);

const pelajarOnPengajarSchema = new Schema(
  {
    pelajarId: { type: SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    pengajarId: { type: SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    programId: { type: SchemaTypes.ObjectId, required: true, ref: 'Program' },
  },
  { collection: 'PelajarOnPengajar' }
);
pelajarOnPengajarSchema.index({ pelajarId: 1, programId: 1 }, { unique: true });

export type PelajarOnPengajarInfer = InferSchemaType<
  typeof pelajarOnPengajarSchema
>;
export interface PelajarOnPengajar extends PelajarOnPengajarInfer {
  _id: Types.ObjectId;
}

export const PelajarOnPengajar = mongoose.model(
  'PelajarOnPengajar',
  pelajarOnPengajarSchema
);

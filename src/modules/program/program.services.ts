import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { formatDate } from '../../utils/formatDate';

export async function checkPengajarByPelajarId(
  reply: FastifyReply,
  { pelajarId, programId }: { pelajarId: number; programId: number }
) {
  return await commitToDB(
    prisma.pengajar.count({ where: { pelajarId, programId } }),
    reply
  ).then((val) => !!val);
}

export async function getProgram(
  reply: FastifyReply,
  { pelajarId }: { pelajarId: number }
) {
  return await commitToDB(
    prisma.program.findMany({
      select: {
        id: true,
        name: true,
        individual: true,
        pengajar: { select: { programId: true }, where: { pelajarId } },
      },
      orderBy: { id: 'asc' },
    }),
    reply
  );
}

export async function getAbsentByProgramId(
  reply: FastifyReply,
  { pelajarId, programId }: { pelajarId: number; programId: number }
) {
  return await commitToDB(
    prisma.absent.findUnique({
      where: {
        pelajarId_programId_date: {
          pelajarId,
          programId,
          date: new Date(formatDate(new Date())),
        },
      },
      select: { present: true, reason: true },
    }),
    reply
  );
}

export async function getSchedulesByProgramId(
  reply: FastifyReply,
  { programId }: { programId: number }
) {
  return await commitToDB(
    prisma.schedule.findMany({
      where: { programId, date: new Date(formatDate(new Date())) },
      select: { pengajarId: true, available: true, reason: true },
    }),
    reply
  );
}

export async function getPelajarByProgramId(
  reply: FastifyReply,
  pelajarId_programId: { pelajarId: number; programId: number }
) {
  return await commitToDB(
    prisma.pelajarOnPengajar.findUnique({ where: { pelajarId_programId } }),
    reply
  );
}

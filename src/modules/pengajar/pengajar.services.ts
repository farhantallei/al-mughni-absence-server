import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { formatDate } from '../../utils/formatDate';

export async function getPengajarByProgramId(
  reply: FastifyReply,
  { programId }: { programId: number }
) {
  return await commitToDB(
    prisma.pengajar
      .findMany({
        where: { programId },
        select: { pelajar: true },
      })
      .then((pengajar) => pengajar.map(({ pelajar }) => pelajar)),
    reply
  );
}

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

export async function getSchedule(
  reply: FastifyReply,
  { pengajarId, programId }: { pengajarId: number; programId: number }
) {
  return await commitToDB(
    prisma.schedule.findUnique({
      where: {
        pengajarId_programId_date: {
          pengajarId,
          programId,
          date: new Date(formatDate(new Date())),
        },
      },
      select: { pengajarId: true, available: true, reason: true },
    }),
    reply
  );
}

export async function setPengajar(
  reply: FastifyReply,
  data: { pelajarId: number; pengajarId: number; programId: number }
) {
  return await commitToDB(prisma.pelajarOnPengajar.create({ data }), reply);
}

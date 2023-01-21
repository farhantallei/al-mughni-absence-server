import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { formatDate } from '../../utils/formatDate';

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

export async function getAbsentByPelajarId(
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

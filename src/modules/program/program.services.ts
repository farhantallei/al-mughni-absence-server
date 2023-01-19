import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { formatDate } from '../../utils/formatDate';

export async function getProgram(reply: FastifyReply) {
  return await commitToDB(prisma.program.findMany(), reply);
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

import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function getPengajarByProgram(
  reply: FastifyReply,
  { program }: { program: string }
) {
  return await commitToDB(
    prisma.pengajar
      .findMany({
        where: { program: { name: program } },
        select: { pelajar: true },
        orderBy: { pelajar: { name: 'asc' } },
      })
      .then((pengajar) => pengajar.map(({ pelajar }) => pelajar)),
    reply
  );
}

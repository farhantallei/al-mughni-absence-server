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
        where: { Program: { name: program } },
        select: { Pelajar: true },
        orderBy: { Pelajar: { name: 'asc' } },
      })
      .then((pengajar) => pengajar.map((val) => val.Pelajar)),
    reply
  );
}

import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function getPelajar(
  reply: FastifyReply,
  { username }: { username: string }
) {
  return await commitToDB(
    prisma.pelajar.findUnique({ where: { username } }),
    reply
  );
}

export async function createPelajar(
  reply: FastifyReply,
  data: { username: string; name: string }
) {
  return await commitToDB(prisma.pelajar.create({ data }), reply);
}

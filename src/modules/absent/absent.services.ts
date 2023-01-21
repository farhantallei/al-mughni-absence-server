import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { formatDate } from '../../utils/formatDate';

export async function checkAbsent(
  reply: FastifyReply,
  {
    pelajarId,
    programId,
    date,
  }: { pelajarId: number; programId: number; date: Date }
) {
  return await commitToDB(
    prisma.absent.count({ where: { pelajarId, programId, date } }),
    reply
  ).then((val) => !!val);
}

export async function getAbsent(
  reply: FastifyReply,
  pelajarId_programId_date: { pelajarId: number; programId: number; date: Date }
) {
  return await commitToDB(
    prisma.absent
      .findUnique({
        where: { pelajarId_programId_date },
        select: {
          id: true,
          pengajarId: true,
          programId: true,
          date: true,
          present: true,
          reason: true,
        },
      })
      .then((res) => {
        if (res == null) return null;
        return { ...res, date: formatDate(res.date) };
      }),
    reply
  );
}

export async function addAbsent(
  reply: FastifyReply,
  data: {
    reason?: string;
    date: Date;
    pelajarId: number;
    pengajarId?: number;
    programId: number;
    present: boolean;
  }
) {
  return await commitToDB(
    prisma.absent
      .create({
        data,
        select: {
          id: true,
          pengajarId: true,
          programId: true,
          date: true,
          present: true,
          reason: true,
        },
      })
      .then((res) => ({ ...res, date: formatDate(res.date) })),
    reply
  );
}

export async function updateAbsent(
  reply: FastifyReply,
  data: {
    reason?: string | null;
    date: Date;
    pelajarId: number;
    pengajarId?: number;
    programId: number;
    present: boolean;
  }
) {
  return await commitToDB(
    prisma.absent
      .update({
        where: {
          pelajarId_programId_date: {
            pelajarId: data.pelajarId,
            programId: data.programId,
            date: data.date,
          },
        },
        data,
        select: {
          id: true,
          pengajarId: true,
          programId: true,
          date: true,
          present: true,
          reason: true,
        },
      })
      .then((res) => ({ ...res, date: formatDate(res.date) })),
    reply
  );
}

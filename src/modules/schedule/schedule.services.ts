import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { formatDate } from '../../utils/formatDate';

export async function checkSchedule(
  reply: FastifyReply,
  {
    pengajarId,
    programId,
    date,
  }: { pengajarId: number; programId: number; date: Date }
) {
  return await commitToDB(
    prisma.schedule.count({ where: { pengajarId, programId, date } }),
    reply
  ).then((val) => !!val);
}

export async function getSchedule(
  reply: FastifyReply,
  pengajarId_programId_date: {
    pengajarId: number;
    programId: number;
    date: Date;
  }
) {
  return await commitToDB(
    prisma.schedule
      .findUnique({
        where: { pengajarId_programId_date },
        select: {
          id: true,
          pengajarId: true,
          programId: true,
          date: true,
          available: true,
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

export async function addSchedule(
  reply: FastifyReply,
  data: {
    pengajarId: number;
    programId: number;
    date: Date;
    available: boolean;
    reason?: string;
  }
) {
  return await commitToDB(
    prisma.schedule
      .create({ data })
      .then((res) => ({ ...res, date: formatDate(res.date) })),
    reply
  );
}

export async function updateSchedule(
  reply: FastifyReply,
  data: {
    pengajarId: number;
    programId: number;
    date: Date;
    available: boolean;
    reason?: string | null;
  }
) {
  await commitToDB(
    prisma.absent.deleteMany({
      where: {
        pengajarId: data.pengajarId,
        programId: data.programId,
        date: data.date,
      },
    }),
    reply
  );

  return await commitToDB(
    prisma.schedule
      .update({
        where: {
          pengajarId_programId_date: {
            pengajarId: data.pengajarId,
            programId: data.programId,
            date: data.date,
          },
        },
        data,
      })
      .then((res) => ({ ...res, date: formatDate(res.date) })),
    reply
  );
}

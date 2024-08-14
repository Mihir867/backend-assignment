import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date } = req.body;
  const userId = req.user.id;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      due_date: new Date(due_date),
      user: { connect: { id: userId } },
    },
  });

  res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const tasks = await prisma.task.findMany({ where: { userId } });
  res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status, priority, due_date } = req.body;

  const task = await prisma.task.update({
    where: { id: parseInt(taskId) },
    data: {
      title,
      description,
      status,
      priority,
      due_date: due_date ? new Date(due_date) : undefined,
    },
  });

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  await prisma.task.delete({
    where: { id: parseInt(taskId) },
  });

  res.status(204).send();
};

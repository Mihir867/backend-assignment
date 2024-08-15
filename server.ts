import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());


// User Registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.json(user);
  });
  
  // User Login
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
    res.json({ token });
  });

  // Create Task
app.post('/api/tasks', async (req, res) => {
    const { title, description, status, priority, due_date, userId } = req.body;
    const task = await prisma.task.create({
      data: { title, description, status, priority, due_date, userId },
    });
    res.json(task);
  });
  
  // Get Tasks
  app.get('/api/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  });
  
  // Update Task
  app.put('/api/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { title, description, status, priority } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { title, description, status, priority },
    });
    res.json(task);
  });
  
  // Delete Task
  app.delete('/api/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    await prisma.task.delete({ where: { id: Number(taskId) } });
    res.sendStatus(204);
  });

  // Get Filtered Tasks
app.get('/api/tasks/filter', async (req, res) => {
    const { status, priority, due_date } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        AND: [
          status ? { status: String(status) } : {},
          priority ? { priority: String(priority) } : {},
          due_date ? { due_date: { lte: new Date(String(due_date)) } } : {},
        ],
      },
    });
    res.json(tasks);
  });
  
  // Search Tasks
  app.get('/api/tasks/search', async (req, res) => {
    const { query } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: String(query), mode: 'insensitive' } },
          { description: { contains: String(query), mode: 'insensitive' } },
        ],
      },
    });
    res.json(tasks);
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


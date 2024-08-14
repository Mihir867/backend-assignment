import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from './controllers/taskControllers';

const router = Router();
router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.put('/tasks/:taskId', authenticate, updateTask);
router.delete('/tasks/:taskId', authenticate, deleteTask);

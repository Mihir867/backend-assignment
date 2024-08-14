import express from 'express';
import { json } from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(json());

app.locals.prisma = prisma;

export default app;

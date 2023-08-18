import express, { Express, Request, Response } from 'express';
const app: Express = express();

// discord
import discord from './configs/discord';
import { init } from './controllers/discord';
init(discord);

export default app;

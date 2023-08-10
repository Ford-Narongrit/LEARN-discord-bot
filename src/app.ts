import express, { Express, Request, Response } from 'express';
const app: Express = express();

// discord
import discord from './configs/discord';
import { ready, interactionCreate } from './controllers/discord';
ready(discord);
interactionCreate(discord);

export default app;

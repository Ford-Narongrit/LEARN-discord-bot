import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const discord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});
discord.login(process.env.DISCORD_TOKEN);

export default discord;

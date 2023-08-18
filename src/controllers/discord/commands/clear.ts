import * as Discord from 'discord.js';
import { Command } from '../command';
import * as queue from '../services/queue';

export const Clear: Command = {
  name: 'clear',
  description: 'clear playlist',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const content = 'clear playlist';
    queue.clear();
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

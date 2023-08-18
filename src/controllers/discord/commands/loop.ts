import * as Discord from 'discord.js';
import * as queue from '../services/queue';
import { Command } from '../command';

export const Loop: Command = {
  name: 'loop',
  description: 'loop playlist',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    let content = 'loop command';
    const repeat = queue.getLoop();
    if (repeat) {
      queue.setLoop(false);
      content = 'Loop disabled';
    } else {
      queue.setLoop(true);
      content = 'Loop enabled';
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

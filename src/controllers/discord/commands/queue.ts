import * as Discord from 'discord.js';
import { Command } from '../command';
import * as queue from '../services/queue';

export const Queue: Command = {
  name: 'queue',
  description: 'Returns a queue player list',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const list = queue.list();
    let content = '**Queue:**\n';
    if (list.length) {
      list
        .filter((_, index) => {
          return index < 10;
        })
        .forEach((item, index) => {
          content += `${index + 1}: ${item.title}\n`;
        });
      if (list.length >= 10) {
        content += '...';
      }
    } else {
      content += '*(empty)*';
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

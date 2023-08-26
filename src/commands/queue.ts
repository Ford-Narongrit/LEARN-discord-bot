import * as Discord from 'discord.js';
import { Command } from '../discord/command';

import * as queue from '../services/queue';
import * as embed from '../services/embed';

export const Queue: Command = {
  name: 'queue',
  description: 'Returns a queue player list',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const list = queue.list();
    if (list.length) {
      const queueList = list.map((song, index) => `**${index + 1} ${song.title}**`).join('\n');

      await interaction.followUp({
        ephemeral: true,
        embeds: [embed.createEmbed('Queue playlist.', queueList, [])],
      });
    } else {
      await interaction.followUp({
        ephemeral: true,
        embeds: [embed.createEmbed('Queue playlist.', '*Queue is empty.*', [])],
      });
    }
  },
};

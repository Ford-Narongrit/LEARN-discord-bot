import * as Discord from 'discord.js';
import * as queue from '../services/queue';
import { Command } from '../command';
import * as embed from '../services/embed';

export const Loop: Command = {
  name: 'loop',
  description: 'loop playlist',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const repeat = queue.getLoop();
    if (repeat) {
      queue.setLoop(false);
    } else {
      queue.setLoop(true);
    }

    await interaction.followUp({
      ephemeral: true,
      embeds: [
        embed.createEmbed('Set Loop status', 'status ? ', [
          { name: 'Loop status', value: queue.getLoop() ? '✅ on ' : '❌ off' },
        ]),
      ],
    });
    return;
  },
};

import * as Discord from 'discord.js';
import { Command } from '../command';
import * as player from '../services/player';
import * as embed from '../services/embed';

export const Pause: Command = {
  name: 'pause',
  description: 'pause tack',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    player.pause();

    await interaction.followUp({
      ephemeral: true,
      embeds: [
        embed.createEmbed('Pause track', 'pause ? ', [
          { name: 'Loop status', value: player.isPaused() ? '⏸️ pause' : '▶️ play' },
        ]),
      ],
    });
    return;
  },
};

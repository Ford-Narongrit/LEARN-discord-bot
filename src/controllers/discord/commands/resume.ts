import * as Discord from 'discord.js';
import { Command } from '../command';
import * as player from '../services/player';
import * as embed from '../services/embed';

export const Resume: Command = {
  name: 'resume',
  description: 'resume tack',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    player.unpause();

    await interaction.followUp({
      ephemeral: true,
      embeds: [
        embed.createEmbed('Unpause track', 'pause ? ', [
          { name: 'Loop status', value: player.isPaused() ? '⏸️ pause' : '▶️ play' },
        ]),
      ],
    });
    return;
  },
};

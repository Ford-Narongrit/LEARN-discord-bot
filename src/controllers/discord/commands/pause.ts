import * as Discord from 'discord.js';
import { Command } from '../command';
import * as player from '../services/player';

export const Pause: Command = {
  name: 'pause',
  description: 'pause tack',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const content = 'pause tack';
    player.pause();
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

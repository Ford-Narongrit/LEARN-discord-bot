import * as Discord from 'discord.js';
import { Command } from '../command';

export const Hello: Command = {
  name: 'hello',
  description: 'Returns a greeting',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const content = 'Hello there!';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

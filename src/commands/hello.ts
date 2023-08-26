import * as Discord from 'discord.js';
import { Command } from '../discord/command';
import { createEmbed } from '../services/embed';

export const Hello: Command = {
  name: 'hello',
  description: 'Returns a greeting',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    const embed = createEmbed('Hello', 'Hello world!', []);

    await interaction.followUp({
      ephemeral: true,
      embeds: [embed],
    });
  },
};

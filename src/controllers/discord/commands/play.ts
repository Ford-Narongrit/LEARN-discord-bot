import * as Discord from 'discord.js';
import { Command } from '../command';
import { player } from '../utils/player';

export const Play: Command = {
  name: 'play',
  description: 'play a song',
  options: [
    {
      name: 'url',
      description: 'youtube url',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: any, interaction: Discord.CommandInteraction) => {
    try {
      // user that use command
      const commander: any = interaction.member;
      if (!commander?.voice.channel || !interaction.guild) {
        const content = 'You must be in a voice channel to use this command.';
        return await interaction.followUp({
          ephemeral: true,
          content,
        });
      }

      // Get options value.
      const url = interaction.options.get('url')?.value as string;

      player(interaction, url, commander.voice.channel.id);

      const content = 'this is for play song';
      await interaction.followUp({
        ephemeral: true,
        content,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

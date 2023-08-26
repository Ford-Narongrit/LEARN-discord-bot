import * as Discord from 'discord.js';
import { Command } from '../discord/command';
import * as queue from '../services/queue';
import * as embed from '../services/embed';

export const Clear: Command = {
  name: 'clear',
  description: 'clear playlist',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    queue.clear();

    await interaction.followUp({
      ephemeral: true,
      embeds: [embed.createEmbed('Clear queue', 'playlist empty.', [])],
    });
    return;
  },
};

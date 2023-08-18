import * as Discord from 'discord.js';
import * as queue from '../services/queue';
import * as voice from '../services/voice';
import * as player from '../services/player';
import { Command } from '../command';

export const Skip: Command = {
  name: 'skip',
  description: 'skip to next tack in queue',
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    let content = 'skip command';
    // user that use command
    const commander: any = interaction.member;
    if (!commander?.voice.channel || !interaction.guild) {
      content = 'You must be in a voice channel to use this command.';
      return await interaction.followUp({
        ephemeral: true,
        content,
      });
    }

    // join voice channel.
    await voice.join(commander.voice.channel);

    const item = queue.dequeue();
    if (item) {
      content = `Playing **${item.title}**`;
      await player.play(item);
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

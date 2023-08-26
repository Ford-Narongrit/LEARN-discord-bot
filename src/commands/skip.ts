import * as Discord from 'discord.js';
import * as queue from '../services/queue';
import * as voice from '../services/voice';
import * as player from '../services/player';
import { Command } from '../discord/command';

export const Skip: Command = {
  name: 'skip',
  description: 'skip to next tack in queue',
  options: [
    {
      name: 'to',
      description: 'track number in queue',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: false,
      min_value: 1,
    },
  ],
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

    const index_to_skip = interaction.options.get('to')?.value as number;

    if (index_to_skip < 1 || index_to_skip > queue.list().length) {
      content = 'Invalid track number.';
      return await interaction.followUp({
        ephemeral: true,
        content,
      });
    }

    const item = queue.dequeue(index_to_skip ? index_to_skip : 1);
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

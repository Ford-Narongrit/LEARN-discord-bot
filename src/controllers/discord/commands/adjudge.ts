import * as Discord from 'discord.js';
import { Command } from '../command';
import { vote } from '../services/vote';
// import { player } from '../services/player';
import { move } from '../services/move';

export const Adjudge: Command = {
  name: 'adjudge',
  description: 'took someone to attitude adjustment',
  options: [
    {
      name: 'user',
      description: 'user, who do you want to take to attitude adjustment',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'in',
      description: 'channel, where you want to take to attitude adjustment',
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [Discord.ChannelType.GuildVoice],
    },
    {
      name: 'url',
      description: 'youtube url',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    try {
      // user that use command
      const commander: any = interaction.member;
      if (!commander) return;

      // Get options value.
      const user = interaction.options.getMember('user') as Discord.GuildMember;
      const channel_in = interaction.options.get('in')?.channel as Discord.VoiceChannel;
      const url = interaction.options.get('url')?.value as string;
      const members_count = commander.voice.channel.members.size;

      // return missing options.
      if (!user || !channel_in || !url || !interaction.channel || !interaction.guild) {
        const content = 'error command missing some options.';
        await interaction.followUp({
          ephemeral: true,
          content,
        });
        return;
      }

      vote(client, interaction, members_count, 10000, async () => {
        // move user to channel.
        const member = await move(user, channel_in.id);
        // play song.
        // await player(interaction, url, channel_in.id);
      });

      const content = 'JUDGEMENT DAY!';
      await interaction.followUp({
        ephemeral: true,
        content,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

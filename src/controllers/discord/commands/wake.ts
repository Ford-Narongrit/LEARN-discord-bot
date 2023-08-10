import {
  ApplicationCommandOptionType,
  CommandInteraction,
  VoiceChannel,
  GuildMember,
  Client,
  ChannelType,
} from 'discord.js';
import { Command } from '../command';

export const Wake: Command = {
  name: 'wake',
  description: 'to wake up someone',
  options: [
    {
      name: 'from',
      description: 'from channel ....',
      type: ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [ChannelType.GuildVoice],
    },
    {
      name: 'to',
      description: 'to channel ....',
      type: ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [ChannelType.GuildVoice],
    },
    {
      name: 'user',
      description: 'user to wake up',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'number',
      description: 'number loop',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 10,
      max_value: 100,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const from = interaction.options.get('from');
    const to = interaction.options.get('to');
    const user_to_wake = interaction.options.getMember('user') as GuildMember;
    const number = interaction.options.get('number')?.value as number;

    if (!from?.channel || !to?.channel || !user_to_wake || !number) {
      const content = 'error command missing some options.';
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return;
    }

    for (let i = 0; i < number / 2; i++) {
      await moveMemberTo(user_to_wake, to.channel.id).then((result) => {
        try {
          if (result) {
            if (!from?.channel) return;
            moveMemberTo(user_to_wake, from.channel.id);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }

    const content = 'Job done.';
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

async function moveMemberTo(member: GuildMember, channelID: string): Promise<boolean> {
  try {
    member.voice.setChannel(channelID);
    return true;
  } catch (error) {
    return false;
  }
}

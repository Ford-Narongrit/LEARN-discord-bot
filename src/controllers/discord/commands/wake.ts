import * as Discord from 'discord.js';

import { Command } from '../command';

export const Wake: Command = {
  name: 'wake',
  description: 'to wake up someone',
  options: [
    {
      name: 'from',
      description: 'from channel ....',
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [Discord.ChannelType.GuildVoice],
    },
    {
      name: 'to',
      description: 'to channel ....',
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [Discord.ChannelType.GuildVoice],
    },
    {
      name: 'user',
      description: 'user to wake up',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'number',
      description: 'number loop',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
      max_value: 100,
    },
  ],
  run: async (client: Discord.Client, interaction: Discord.CommandInteraction) => {
    try {
      // user that use command
      const commander: any = interaction.member;
      if (!commander) return;

      // Get options value.
      const from = interaction.options.get('from')?.channel as Discord.VoiceChannel;
      const to = interaction.options.get('to')?.channel as Discord.VoiceChannel;
      const user_to_wake = interaction.options.getMember('user') as Discord.GuildMember;
      const number = interaction.options.get('number')?.value as number;

      const members_count = commander.voice.channel.members.size;

      // return missing options.
      if (!from || !to || !user_to_wake || !number || !interaction.channel) {
        const content = 'error command missing some options.';
        await interaction.followUp({
          ephemeral: true,
          content,
        });
        return;
      }

      // send vote message
      const message = await interaction.channel.send(
        `React to this message to vote for do command. need 👍 ${members_count / 2 + 1} votes.`,
      );

      let voteAccept = 0;
      message.react('👍');

      let voteReject = 0;
      message.react('👎');

      const filter: any = (reaction: { emoji: { name: string } }, user: { id: string }) =>
        (reaction.emoji.name === '👍' || reaction.emoji.name === '👎') && user.id !== client.user!.id;
      const collector = message.createReactionCollector({ filter: filter, time: 10000 }); // vote timer 10 sec.

      // collect vote event
      collector.on('collect', async (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        if (reaction.emoji.name === '👍') voteAccept++;
        if (reaction.emoji.name === '👎') voteReject++;

        if (voteAccept >= members_count / 2) {
          await message.channel.send(`Enough votes received! Command unlocked. ${voteAccept}/${members_count}`);

          // do command
          for (let i = 0; i < number / 2; i++) {
            await moveMemberTo(user_to_wake, to.id).then(async () => {
              await moveMemberTo(user_to_wake, from.id);
            });
          }
        }
        if (voteReject >= members_count / 2) {
          await message.channel.send(`Not enough votes received! Command locked. ${voteAccept}/${members_count}`);
        }
      });

      collector.on('end', async () => {
        message.edit(`Voting has ended. Final vote count: 👍 = ${voteAccept}, 👎 = ${voteReject}`);
        const content = 'Job done.';
        await interaction.followUp({
          ephemeral: true,
          content,
        });
      });
    } catch (error) {
      const content = 'error command.';
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      console.log(error);
    }
  },
};

async function moveMemberTo(member: Discord.GuildMember, channelID: string): Promise<Discord.GuildMember> {
  if (!member.voice.channel) return member;
  return member.voice.setChannel(channelID);
}

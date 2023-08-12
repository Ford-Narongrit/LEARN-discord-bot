import * as Discord from 'discord.js';

export async function move_to(member: Discord.GuildMember, channelID: string): Promise<Discord.GuildMember> {
  try {
    if (!member.voice.channel) return member;
    return member.voice.setChannel(channelID);
  } catch (error) {
    console.log(error);
    return member;
  }
}

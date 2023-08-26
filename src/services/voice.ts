import { VoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { StageChannel, VoiceChannel } from 'discord.js';
import * as playerService from './player';

let connection: VoiceConnection;
let voiceChannelId: string;

export async function join(channel: VoiceChannel | StageChannel | null) {
  if (!(channel instanceof VoiceChannel)) return;
  // join voice channel.
  connection = joinVoiceChannel({
    channelId: channel.id as string,
    guildId: channel.guildId as string,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  voiceChannelId = channel.id as string;

  const player = playerService.init();
  connection.subscribe(player);
}

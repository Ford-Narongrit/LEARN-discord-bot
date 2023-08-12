import ytdl from 'ytdl-core';
import {
  VoiceConnection,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
} from '@discordjs/voice';
import * as Discord from 'discord.js';

export async function player(interaction: Discord.CommandInteraction, url: string, channel_id: string) {
  try {
    if (!interaction.channel || !interaction.guild) return;
    // init stream.
    const stream = ytdl(url as string, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    // create voice resource.
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    // join voice channel.
    const connection = joinVoiceChannel({
      channelId: channel_id,
      guildId: interaction.guildId as string,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    // play song.
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    player.on('error', (error) => {
      console.error('Error:', error);
    });
  } catch (error) {
    console.log(error);
  }
}

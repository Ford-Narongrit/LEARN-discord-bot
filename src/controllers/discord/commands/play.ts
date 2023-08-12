import * as Discord from 'discord.js';
import { Command } from '../command';
import ytdl from 'ytdl-core';
import {
  VoiceConnection,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
} from '@discordjs/voice';

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

      // init stream.
      const stream = ytdl(url as string, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });

      // create voice resource.
      const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

      // join voice channel.
      const connection = joinVoiceChannel({
        channelId: commander.voice.channel.id,
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

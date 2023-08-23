import * as Discord from 'discord.js';
import { Command } from '../command';
import * as voice from '../services/voice';
import * as player from '../services/player';
import * as queue from '../services/queue';
import * as metadata from '../services/metadata';

export const Play: Command = {
  name: 'play',
  description: 'play a song',
  options: [
    {
      name: 'query',
      description: 'youtube url or search query',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: any, interaction: Discord.CommandInteraction) => {
    try {
      let content = 'play command';

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

      // Get options value.
      const query = interaction.options.get('query')?.value as string;

      // query metadata.
      const result = await metadata.query(query);
      if (!result?.data) {
        content = 'query video not found';
        await interaction.followUp({
          ephemeral: true,
          content,
        });
        return;
      }

      if (result.is_search) {
        content = `is search result(s)`;
        // TODO add search result vote top 5 result.
      } else {
        if (queue.list().length === 0 && player.getCurrentItem() === undefined) {
          let item: metadata.PlayableItem | undefined;
          if (Array.isArray(result.data)) {
            item = result.data.shift();
            queue.enqueue(result.data);
          } else {
            item = result.data;
          }
          await player.play(item);
        } else {
          queue.enqueue(result.data);
        }
        content = `add to queue`;
      }

      await interaction.followUp({
        ephemeral: true,
        content,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

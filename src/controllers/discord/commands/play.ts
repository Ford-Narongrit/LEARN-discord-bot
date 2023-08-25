import * as Discord from 'discord.js';
import { Command } from '../command';
import { choice } from '../services/choice';
import * as voice from '../services/voice';
import * as player from '../services/player';
import * as queue from '../services/queue';
import * as metadata from '../services/metadata';
import * as embed from '../services/embed';

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
        await interaction.followUp({
          ephemeral: true,
          embeds: [embed.errorEmbed('Error', 'you need to in voice channel to use this command.', [])],
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
          embeds: [embed.errorEmbed('query video not found', `${query}`, [])],
        });
        return;
      }

      let item: metadata.PlayableItem | metadata.PlayableItem[] | undefined;
      // is search
      if (result.is_search) {
        const choices_item = result.data.map((item, index) => {
          return { name: `${index + 1}`, value: item.title };
        });
        const index_choice = await choice(client, interaction, choices_item, 10000);
        item = result.data[index_choice];
      } else {
        item = result.data;
      }

      if (queue.list().length === 0 && player.getCurrentItem() === undefined) {
        if (Array.isArray(item)) {
          player.play(item.shift());
          queue.enqueue(item);
        } else {
          await player.play(item);
        }
      } else {
        queue.enqueue(item);
      }

      await interaction.followUp({
        ephemeral: true,
        embeds: [
          embed.createEmbed(
            'Add song to queue',
            `add song ${result.data[0].title} ${
              result.data.length > 1 && !result.is_search ? `and ${result.data.length} songs.` : ''
            }`,
            [],
          ),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};

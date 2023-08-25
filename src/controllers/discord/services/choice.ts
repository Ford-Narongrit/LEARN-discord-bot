import * as Discord from 'discord.js';
import * as embed from '../services/embed';

export async function choice(
  client: Discord.Client,
  interaction: Discord.CommandInteraction,
  array: Discord.APIEmbedField[],
  time: number = 10000,
): Promise<any | null> {
  try {
    if (!interaction.channel) return;

    const numbers_emoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

    const message = await interaction.followUp({
      ephemeral: true,
      embeds: [embed.createEmbed('Choose your choice.', `choice`, array)],
    });

    for (let i = 0; i < array.length; i++) {
      await message.react(numbers_emoji[i]);
    }

    return new Promise((resolve, reject) => {
      const filter: any = (reaction: { emoji: { name: string } }, user: { id: string }) =>
        numbers_emoji.includes(reaction.emoji.name) && user.id !== client.user!.id;
      const collector = message.createReactionCollector({ filter: filter, time }); // vote timer 10 sec.

      // collect vote event
      let collectedReaction: Discord.MessageReaction | null = null;
      let emojiIndex = 0;
      collector.on('collect', async (reaction, user) => {
        collectedReaction = reaction;
        emojiIndex = numbers_emoji.indexOf(reaction.emoji.name as string);
        collector.stop();
      });

      collector.on('end', async () => {
        message.edit(`you choose ${collectedReaction?.emoji.name}`);
        resolve(emojiIndex);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

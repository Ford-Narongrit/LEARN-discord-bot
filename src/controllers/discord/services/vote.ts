import * as Discord from 'discord.js';

export async function vote(
  client: Discord.Client,
  interaction: Discord.CommandInteraction,
  total_member: number,
  time: number = 10000,
  action: () => void,
) {
  try {
    if (!interaction.channel) return;
    // send vote message
    const message = await interaction.channel.send(
      `React to this message to vote for do command. need 👍 ${total_member / 2 + 1} votes.`,
    );

    let voteAccept = 0;
    message.react('👍');

    let voteReject = 0;
    message.react('👎');

    const filter: any = (reaction: { emoji: { name: string } }, user: { id: string }) =>
      (reaction.emoji.name === '👍' || reaction.emoji.name === '👎') && user.id !== client.user!.id;
    const collector = message.createReactionCollector({ filter: filter, time }); // vote timer 10 sec.

    // collect vote event
    collector.on('collect', async (reaction, user) => {
      if (reaction.emoji.name === '👍') voteAccept++;
      if (reaction.emoji.name === '👎') voteReject++;

      if (voteAccept >= total_member / 2) {
        await message.channel.send(`Enough votes received! Command unlocked. ${voteAccept}/${total_member}`);
        // do command
        action();
      }
      if (voteReject >= total_member / 2) {
        await message.channel.send(`Not enough votes received! Command locked. ${voteAccept}/${total_member}`);
      }
    });

    // vote end event
    collector.on('end', async () => {
      message.edit(`Voting has ended. Final vote count: 👍 = ${voteAccept}, 👎 = ${voteReject}`);
      const content = 'Time up, vote done.';
      await interaction.followUp({
        ephemeral: true,
        content,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

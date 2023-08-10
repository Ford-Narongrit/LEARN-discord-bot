import { CommandInteraction, Client, Interaction } from 'discord.js';
import { Commands } from './commands';

export function ready(client: Client): void {
  client.on('ready', async () => {
    if (!client.user || !client.application) return;

    await client.application.commands.set(Commands);

    console.log(`${client.user.displayName} ready to serve you.`);
  });
}

export function interactionCreate(client: Client): void {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occurred' });
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction);
};

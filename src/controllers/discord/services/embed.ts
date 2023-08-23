import { EmbedBuilder, APIEmbedField } from 'discord.js';

export function createEmbed(title: string, description: string, fields: APIEmbedField[]): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(`✅ ${title}`)
    .setDescription(description)
    .setColor('#5eeb34')
    .addFields(fields);
  return embed;
}

export function errorEmbed(title: string, description: string, fields: APIEmbedField[]): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(`❌ ${title}`)
    .setDescription(description)
    .setColor('#f01818')
    .addFields(fields);
  return embed;
}

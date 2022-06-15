import { MessageActionRow, MessageEmbed } from "discord.js";

export interface DiscordMessageData {
  embeds: MessageEmbed[];
  components: MessageActionRow[];
}

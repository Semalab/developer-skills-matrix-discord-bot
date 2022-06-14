import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { logHandler } from "../utils/logHandler";

export const start: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Use sema's developer rubric"),
  async run(bot, interaction) {
    try {
      if (interaction.isCommand() && interaction.commandName === "start") {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply("Startting Rubric!");
      }
    } catch (err) {
      logHandler.log("error", err);
    }
  },
};

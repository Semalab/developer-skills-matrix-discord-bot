import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { rubricStartHandler } from "../modules/start/rubricStartHandler";
import { logHandler } from "../utils/logHandler";

export const start: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Use Sema's developer rubric"),
  async run(bot, interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      await rubricStartHandler(bot, interaction);
    } catch (err) {
      logHandler.log("error", err);
    }
  },
};

import { Client, Interaction } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { Bot } from "./interfaces/Bot";
import { logHandler } from "./utils/logHandler";
import { registerCommands } from "./utils/registerCommands";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as Bot;
  bot.once("ready", async () => {
    const registerSuccess = await registerCommands(bot);

    if (registerSuccess) {
      logHandler.log("info", "All bot commands registered in Guild.");
    } else {
      logHandler.log("error", "Failed to register bot commands");
    }
    logHandler.log("info", "Bot is ready!");
  });

  bot.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
      try {
        const command = bot.commands.find(
          (el) => el.data.name === interaction.commandName
        );
        if (!command) {
          await interaction.reply(
            "Bad Interaction: Bot can't find the Command."
          );
          return;
        }
      } catch (error) {
        await interaction.reply(
          "Internal Bot Error: There was an error while running this command."
        );
        logHandler.log("warn", `${interaction.commandName} failed.`);
      }
    }
  });

  try {
    if (process.env.BOT_TOKEN !== undefined) {
      await bot.login(process.env.BOT_TOKEN);
      const configs: Bot["envConfigs"] = {
        token: process.env.BOT_TOKEN,
        homeGuildID: process.env.GUILD_ID,
      };
      bot.envConfigs = configs;
    } else {
      logHandler.log("error", "No BOT_TOKEN set in .env");
    }
  } catch (err) {
    const error = err as Error;
    if (error.name === "Error [TOKEN_INVALID]") {
      logHandler.log("error", "Invalid bot token used.");
    }
  }
})();

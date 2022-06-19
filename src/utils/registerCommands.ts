import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { Bot } from "../interfaces/Bot";

import { logHandler } from "./logHandler";

/**
 * Function to register commands for the discord bot.
 *
 * @param {Bot} Bot - Object representing the discord Client used by bot.
 * @returns {boolean} - Returns true if commands registered successfully.
 */
export const registerCommands = async (Bot: Bot): Promise<boolean> => {
  try {
    if (!Bot.user?.id) {
      logHandler.log(
        "error",
        "Can't Register commands. Discord Bot not logged in."
      );
      return false;
    }

    logHandler.log("info", "Registering bot commands...");
    const rest = new REST({ version: "9" }).setToken(
      Bot.envConfigs.token || ""
    );

    const commandData = Bot.commands.map((el) => el.data.toJSON());
    if (Bot.commands.length === 0) {
      logHandler.log("info", "No commands found to register...");
      return false;
    }
    if (Bot.envConfigs.homeGuildID) {
      logHandler.log("info", "Registering commands to home-guild only...");
      await rest.put(
        Routes.applicationGuildCommands(
          Bot.user.id,
          Bot.envConfigs.homeGuildID
        ),
        {
          body: commandData,
        }
      );
      return true;
    }
    logHandler.log("info", "Registering commands globally...");
    await rest.put(Routes.applicationCommands(Bot.user.id), {
      body: commandData,
    });

    return true;
  } catch (error) {
    logHandler.log("error", error);
    return false;
  }
};

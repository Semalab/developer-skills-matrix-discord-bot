import { readdir } from "fs/promises";
import { join } from "path";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { Bot } from "../interfaces/Bot";
import { Command } from "../interfaces/Command";

import { logHandler } from "./logHandler";

/**
 * Function to register commands for the discord bot.
 *
 * @param {Bot} Bot - Object representing the discord Client used by bot.
 * @returns {boolean} - Returns true if commands registered successfully.
 */
export const registerCommands = async (Bot: Bot): Promise<boolean> => {
  if (!Bot.user?.id) {
    logHandler.log(
      "error",
      "Can't Register commands. Discord Bot not logged in."
    );
    return false;
  }

  try {
    logHandler.log("info", "Registering bot commands...");
    const rest = new REST({ version: "9" }).setToken(
      Bot.envConfigs.token || ""
    );

    const commandFiles = await readdir(
      join(process.cwd(), "src", "commands"),
      "utf-8"
    );
    commandFiles.filter((file) => file.endsWith(".ts"));

    Bot.commands = [];
    for (const file of commandFiles) {
      const fileData = await import(
        join(process.cwd(), "src", "commands", file)
      );
      const name = file.split(".")[0];
      const command = fileData[name] as Command;
      Bot.commands.push(command);
    }

    const commandData = Bot.commands.map((el) => el.data);
    if (Bot.commands.length === 0) {
      logHandler.log("info", "No commands found to register...");
      return false;
    }
    if (
      Bot.envConfigs.homeGuildID &&
      Bot.envConfigs.homeGuildID !== undefined
    ) {
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
    } else {
      logHandler.log("info", "Registering commands globally...");
      await rest.put(Routes.applicationCommands(Bot.user.id), {
        body: commandData,
      });
    }

    return true;
  } catch (error) {
    logHandler.log("error", error);
    return false;
  }
};

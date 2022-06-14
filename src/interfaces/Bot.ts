import { Client } from "discord.js";

import { Command } from "./Command";

/**
 * Interface to extend the discord.js Client class
 * to associate extra data fields with the bot.
 */
export interface Bot extends Client {
  commands: Command[];
  envConfigs: {
    token: string;
    homeGuildID?: string;
  };
}

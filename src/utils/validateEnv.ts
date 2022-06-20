import { Bot } from "../interfaces/Bot";

import { logHandler } from "./logHandler";

/**
 * Validates the ENV and returns the bot's config object.
 *
 * @returns {Bot["envConfigs"]} The expected config object for the bot.
 */
export const validateEnv = (): Bot["envConfigs"] => {
  if (!process.env.BOT_TOKEN || !process.env.GUILD_ID) {
    logHandler.log("error", "Missing env values");
    process.exit(1);
  }

  return {
    token: process.env.BOT_TOKEN,
    homeGuildID: process.env.GUILD_ID,
  };
};

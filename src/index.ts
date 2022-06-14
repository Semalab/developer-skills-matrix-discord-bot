import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { logHandler } from "./utils/logHandler";

(async () => {
  const bot = new Client({ intents: IntentOptions });

  bot.on("ready", () => {
    logHandler.log("info", "Bot is ready!");
  });

  try {
    await bot.login(process.env.BOT_TOKEN);
  } catch (err) {
    const error = err as Error;
    if (error.name === "Error [TOKEN_INVALID]") {
      logHandler.log("error", "Invalid bot token used.");
    }
  }
})();

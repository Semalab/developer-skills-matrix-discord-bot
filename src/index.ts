import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { logHandler } from "./utils/logHandler";

(async () => {
  const bot = new Client({ intents: IntentOptions });

  bot.on("ready", () => {
    logHandler.log("info", "Bot is ready!");
  });

  await bot.login(process.env.BOT_TOKEN);
})();

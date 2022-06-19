import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { handleEvents } from "./events/_handleEvents";
import { Bot } from "./interfaces/Bot";
import { loadCommands } from "./utils/loadCommands";
import { logHandler } from "./utils/logHandler";
import { registerCommands } from "./utils/registerCommands";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as Bot;
  bot.envConfigs = validateEnv();
  bot.commands = await loadCommands();

  handleEvents(bot);

  await bot.login(bot.envConfigs.token);

  const registerSuccess = await registerCommands(bot);

  if (registerSuccess) {
    logHandler.log("info", "Bot commands registered successfully.");
  } else {
    logHandler.log("error", "Failed to register bot commands.");
  }
})();

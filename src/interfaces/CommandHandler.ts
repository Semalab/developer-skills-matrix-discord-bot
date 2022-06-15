import { CommandInteraction } from "discord.js";

import { Bot } from "./Bot";

export type CommandHandler = (
  Bot: Bot,
  interaction: CommandInteraction
) => Promise<void>;

import {
  Message,
  Interaction,
  ButtonInteraction,
  CommandInteraction,
} from "discord.js";

import { CommandHandler } from "../../interfaces/CommandHandler";
import { RubricSummary } from "../../interfaces/RubricData";

import { fetchRubricJSON } from "./fetchRubric";
import { renderRubricMessage } from "./renderRubricMessage";
import { renderRubricSummaryEmbed } from "./renderRubricSummaryEmbed";
import { resolveSkillLevel } from "./resolveSkillLevel";

/**
 * Function to render RubricSubCategoryText into
 * discord's MessageEmbed with Buttons.
 *
 * @param {Bot} Bot - Object representing the discord Client used by bot.
 * @param {CommandInteraction} interaction - The interaction calling this handler.
 */
export const rubricStartHandler: CommandHandler = async (Bot, interaction) => {
  const rubric = await fetchRubricJSON();
  if (!rubric) {
    await interaction.editReply("An error occurred: Can't fetch Rubric.");
    return;
  }

  const buttonCustomIds: string[] = [
    "beginner",
    "advanced-beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  const filter = (i: Interaction) =>
    i.user.id === interaction.user.id &&
    i.isButton() &&
    buttonCustomIds.includes(i.customId);
  const data: RubricSummary[] = [];
  for (const category of rubric) {
    for (const subCategory of category.subCategories) {
      const msgContent = renderRubricMessage(category.category, subCategory);
      if (!msgContent) {
        continue;
      }
      const msg = (await interaction.editReply(msgContent)) as Message;
      await msg
        .awaitMessageComponent({
          filter: filter,
          componentType: "BUTTON",
        })
        .then(async (i: ButtonInteraction) => {
          data.push({
            category: category.category,
            subCategory: subCategory.subCategory,
            ...resolveSkillLevel(i.customId, subCategory),
          });
          await i.update(
            {
              components: renderRubricMessage(category.category, subCategory)
                ?.components,
            } || "..."
          );
        });
    }
  }
  await interaction.editReply({
    embeds: [renderRubricSummaryEmbed(interaction.user, data)],
    components: [],
  });
  return;
};

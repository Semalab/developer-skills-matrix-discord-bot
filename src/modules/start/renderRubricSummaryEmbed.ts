import { MessageEmbed, User } from "discord.js";

import { RubricSummary } from "../../interfaces/RubricData";

/**
 * Function to render RubricSubCategoryText into
 * discord's MessageEmbed with Buttons.
 *
 * @param {User} user - The discord user using the rubric.
 * @param {RubricSummary[]} data - The rubric summary based on the user's selections.
 * @returns {MessageEmbed} - The embed rendered from the rubric summary data.
 */
export const renderRubricSummaryEmbed = (
  user: User,
  data: RubricSummary[]
): MessageEmbed => {
  const embed = new MessageEmbed().setTitle(`Rubric summary for ${user.tag}`);
  for (const field of data) {
    const categoryFieldIndex = embed.fields.findIndex(
      (el) => el.name === field.category
    );
    if (categoryFieldIndex !== -1) {
      embed.fields[
        categoryFieldIndex
      ].value += `\n**${field.subCategory}**\n\`${field.skillLevel}\` - ${field.skillPrompt}`;
    } else {
      embed.addField(
        field.category,
        `**${field.subCategory}**\n\`${field.skillLevel}\` - ${field.skillPrompt}`
      );
    }
  }
  return embed;
};

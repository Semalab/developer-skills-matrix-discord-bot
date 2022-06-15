import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { DiscordMessageData } from "../../interfaces/DiscordMessageData";
import { RubricSubCategoryText } from "../../interfaces/RubricData";
import { logHandler } from "../../utils/logHandler";

/**
 * Function to render RubricSubCategoryText into
 * discord's MessageEmbed with Buttons.
 *
 * @param {string} categoryName - The name of the rubric category.
 * @param {RubricSubCategoryText} subCategory - The data associated with the subcategory.
 * @returns {DiscordMessageData | void} - The rendered rubric data.
 */
export const renderRubricMessage = (
  categoryName: string,
  subCategory: RubricSubCategoryText
): DiscordMessageData | void => {
  try {
    const embeds = [
      new MessageEmbed()
        .setTitle(`Rubric: ${categoryName}`)
        .setDescription(subCategory.subCategory)
        .setColor("#00ffe1")
        .addFields([
          { name: "Beginner", value: subCategory.beginnerText },
          {
            name: "Advanced Beginner",
            value: subCategory.advancedBeginnerText,
          },
          { name: "Intermediate", value: subCategory.intermediateText },
          { name: "Advanced", value: subCategory.advancedText },
          { name: "Expert", value: subCategory.expertText },
        ]),
    ];
    const beginnerButton = new MessageButton()
      .setCustomId("beginner")
      .setLabel("Beginner")
      .setStyle("SUCCESS");
    const advancedBeginnerButton = new MessageButton()
      .setCustomId("advanced-beginner")
      .setLabel("Advanced Beginner")
      .setStyle("SUCCESS");
    const intermediateButton = new MessageButton()
      .setCustomId("intermediate")
      .setLabel("Intermediate")
      .setStyle("SUCCESS");
    const advancedButton = new MessageButton()
      .setCustomId("advanced")
      .setLabel("Advanced")
      .setStyle("SUCCESS");
    const expertButton = new MessageButton()
      .setCustomId("expert")
      .setLabel("Expert")
      .setStyle("SUCCESS");
    const components = [
      new MessageActionRow().addComponents(
        beginnerButton,
        advancedBeginnerButton,
        intermediateButton,
        advancedButton,
        expertButton
      ),
    ];
    return { embeds, components };
  } catch (err) {
    logHandler.log(
      "error",
      "Error occurred while generating embed for rubric."
    );
  }
};

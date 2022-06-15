import { RubricSubCategoryText, SkillLevel } from "../../interfaces/RubricData";
import { logHandler } from "../../utils/logHandler";

/**
 * Function to render RubricSubCategoryText into
 * discord's MessageEmbed with Buttons.
 *
 * @param {string} skillId - The customId of the skill button selected.
 * @param {RubricSubCategoryText} subCategory - The data associated with the subcategory.
 * @returns {SkillLevel} - The resolved skillLevel data.
 */
export const resolveSkillLevel = (
  skillId: string,
  subCategory: RubricSubCategoryText
): SkillLevel => {
  try {
    switch (skillId) {
      case "beginner":
        return {
          skillLevel: "Beginner",
          skillPrompt: subCategory.beginnerText,
        };
      case "advanced-beginner":
        return {
          skillLevel: "Advanced Beginner",
          skillPrompt: subCategory.advancedBeginnerText,
        };
      case "intermediate":
        return {
          skillLevel: "Intermediate",
          skillPrompt: subCategory.intermediateText,
        };
      case "advanced":
        return {
          skillLevel: "Advanced",
          skillPrompt: subCategory.advancedText,
        };
      case "expert":
        return {
          skillLevel: "Expert",
          skillPrompt: subCategory.expertText,
        };
    }
  } catch (err) {
    logHandler.log(
      "error",
      "Error occurred while resolving skillLevel for rubric."
    );
  }
  return { skillLevel: "...", skillPrompt: "..." };
};

import axios from "axios";

import {
  RubricCategoryData,
  RubricSubCategoryText,
} from "../../interfaces/RubricData";
import { logHandler } from "../../utils/logHandler";

/**
 * Function to fetch latest version of the rubric.json file from
 * the developer-rubric repo on GitHub.
 *
 * @returns {string} - The JSON string representing the rubric data.
 */
export const fetchRubricJSON = async (): Promise<
  RubricCategoryData[] | void
> => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/Semalab/developer-rubric/main/rubric/rubric.json"
    );
    if (response.status === 200) {
      const rubricDataList: RubricCategoryData[] = [];

      // The code below would need to be modified
      // and when the format of rubric.json changes

      for (const field of Object.keys(response.data)) {
        const subCategories: RubricSubCategoryText[] = [];
        for (const subField of Object.keys(response.data[field])) {
          subCategories.push({
            subCategory: subField,
            beginnerText: response.data[field][subField]["Beginner"],
            advancedBeginnerText:
              response.data[field][subField]["Advanced Beginner"],
            intermediateText: response.data[field][subField]["Intermediate"],
            advancedText: response.data[field][subField]["Advanced"],
            expertText: response.data[field][subField]["Expert"],
          });
        }
        rubricDataList.push({ category: field, subCategories: subCategories });
      }
      return rubricDataList;
    }
  } catch (err) {
    logHandler.log("error", "Error occurred while fetching Rubric data");
  }
};

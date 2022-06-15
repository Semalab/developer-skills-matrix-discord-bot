export interface RubricSubCategoryText {
  subCategory: string;
  beginnerText: string;
  advancedBeginnerText: string;
  intermediateText: string;
  advancedText: string;
  expertText: string;
}

export interface RubricCategoryData {
  category: string;
  subCategories: RubricSubCategoryText[];
}

export interface RubricSummary {
  category: string;
  subCategory: string;
  skillLevel: string;
  skillPrompt: string;
}

export interface SkillLevel {
  skillLevel: string;
  skillPrompt: string;
}

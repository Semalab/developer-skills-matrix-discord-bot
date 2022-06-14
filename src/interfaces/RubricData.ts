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

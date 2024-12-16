import { Ingredient } from '../shared/ingredient.model';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}

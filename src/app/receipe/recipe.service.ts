import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './receipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  private recipes: Recipe[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    },
    {
      name: 'Noodles Recipe',
      description: 'This is sample noodles recipe',
      imagePath:
        'https://static.vecteezy.com/system/resources/previews/043/290/966/non_2x/fresh-spaghetti-with-pesto-and-cherry-tomatoes-photo.jpg',
    },
  ];

  selectedRecipe: Recipe;

  selectedServiceChangedEvent = new EventEmitter<any>();

  getRecipes() {
    return this.recipes;
  }

  addRecipes(newRecipe: Recipe){
    this.recipes.push(newRecipe)
  }

  setSelectedRecipe(selectedItem: Recipe){
    this.selectedRecipe = selectedItem
    this.selectedServiceChangedEvent.emit()
  }

}

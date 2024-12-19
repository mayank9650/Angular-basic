import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './receipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  private recipes: Recipe[] = [
    {
      id: '1',
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      ingredients: [
        {
          name: 'Potatoes',
          amount: 10,
        },
        {
          name: 'Bread',
          amount: 2,
        },
      ],
    },
    {
      id: '2',
      name: 'Noodles Recipe',
      description: 'This is sample noodles recipe',
      imagePath:
        'https://static.vecteezy.com/system/resources/previews/043/290/966/non_2x/fresh-spaghetti-with-pesto-and-cherry-tomatoes-photo.jpg',
      ingredients: [
        {
          name: 'Tomatoes',
          amount: 10,
        },
        {
          name: 'Burger',
          amount: 2,
        },
      ],
    },
  ];

  selectedRecipe: Recipe;

  selectedServiceChangedEvent = new Subject<any>();

  getRecipes() {
    return this.recipes;
  }

  addRecipes(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }

  getRecipeById(id: string): Recipe {
    return this.recipes.find((item) => item.id === id);
  }

  setSelectedRecipe(selectedItem: Recipe) {
    this.selectedRecipe = selectedItem;
    this.selectedServiceChangedEvent.next();
  }
}

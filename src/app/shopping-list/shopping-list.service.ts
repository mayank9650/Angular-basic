import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  private ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 15,
    },
  ];

  ingredientItemAddedEvent = new EventEmitter<any>();

  getIngredientsList() {
    return this.ingredients
  }

  addItemToIngredientsList(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientItemAddedEvent.emit()
  }
}

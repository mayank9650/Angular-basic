import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

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

  // ingredientItemAddedEvent = new EventEmitter<any>(); //Instead of event emitters use subjects to pass cross component data

  ingredientItemAddedEvent = new Subject<void>();

  getIngredientsList() {
    return this.ingredients;
  }

  addItemToIngredientsList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientItemAddedEvent.next();
  }
}

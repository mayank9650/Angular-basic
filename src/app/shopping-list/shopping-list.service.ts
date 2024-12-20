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
  selectedListItem = new Subject<number>();

  getIngredientsList() {
    return this.ingredients;
  }

  getIngredientByIndex(itemIndex) {
    return this.ingredients.find((item, index) => index === itemIndex);
  }

  addItemToIngredientsList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientItemAddedEvent.next();
  }

  modifyItems({ formValues, index }) {
    this.ingredients = this.ingredients.map((item, itemIndex) => {
      if (index === itemIndex) {
        return formValues;
      }
      return item;
    });
    this.ingredientItemAddedEvent.next();
  }

  deleteItemsByIndex(index: number) {
    this.ingredients = this.ingredients.filter(
      (item, itemIndex) => index !== itemIndex
    );
    this.ingredientItemAddedEvent.next();
  }

  onSelectedListItemClick(index: number) {
    this.selectedListItem.next(index);
  }
}

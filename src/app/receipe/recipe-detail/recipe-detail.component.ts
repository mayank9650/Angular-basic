import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() selectedRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  addItemToShoppingList() {
    // this.shoppingListService.addItemToIngredientsList()
    this.selectedRecipe.ingredients.forEach((item) =>
      this.shoppingListService.addItemToIngredientsList(item)
    );
  }
}

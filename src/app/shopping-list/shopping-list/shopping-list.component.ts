import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  ingredients = this.shoppingListService.getIngredientsList();

  ngOnInit() {
    this.shoppingListService.ingredientItemAddedEvent.subscribe({
      next: () => {
        this.ingredients = this.shoppingListService.getIngredientsList();
      },
    });
  }

  onAdd(ingredient: Ingredient) {
    this.shoppingListService.addItemToIngredientsList(ingredient);
  }

  onMouseLeave() {
    console.log('en222');
  }
}

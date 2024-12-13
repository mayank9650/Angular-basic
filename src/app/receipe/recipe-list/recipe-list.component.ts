import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../receipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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

  @Output() recipeClickedHandler = new EventEmitter<Recipe>();

  onSelectedRecipeClick(selectedRecipe: Recipe) {
    console.log(selectedRecipe);
    this.recipeClickedHandler.emit(selectedRecipe);
  }
}

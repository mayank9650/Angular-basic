import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  constructor(private recipeService: RecipeService) {}

  recipes = this.recipeService.getRecipes();
}

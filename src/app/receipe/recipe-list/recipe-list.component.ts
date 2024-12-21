import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  constructor(private recipeService: RecipeService, private route: Router) {}
  recipes: Recipe[] = this.recipeService.getRecipes();

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe({
      next: () => {
        this.recipes = this.recipeService.getRecipes();
      },
    });
  }

  addNewRecipe() {
    this.route.navigate(['recipes/new']);
  }
}

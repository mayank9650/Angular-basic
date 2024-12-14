import { Component } from '@angular/core';
import { Recipe } from './receipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrl: './receipe.component.css',
})
export class ReceipeComponent {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.selectedServiceChangedEvent.subscribe({
      next: () => {
        this.selectedRecipe = this.recipeService.selectedRecipe;
      },
    });
  }
}

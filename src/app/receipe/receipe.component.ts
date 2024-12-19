import { Component } from '@angular/core';
import { Recipe } from './receipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrl: './receipe.component.css',
})
export class ReceipeComponent {
  selectedRecipe: Recipe;
  recipeSubscription: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeSubscription = this.recipeService.selectedServiceChangedEvent.subscribe({
      next: () => {
        this.selectedRecipe = this.recipeService.selectedRecipe;
      },
    });
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe()
  }
}

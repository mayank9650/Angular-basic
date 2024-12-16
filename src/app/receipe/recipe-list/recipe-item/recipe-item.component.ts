import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../receipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  isSelectedRoute = true;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoutes: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoutes.params.subscribe({
      next: (params) => {
        debugger;
        console.log('this.recipe.id', this.recipe.id, params.id);
        this.isSelectedRoute = params.id === this.recipe.id;
      },
    });
  }

  onRecipeClick() {
    console.log('onRecipeClick', this.recipe);
    this.router.navigate(['/recipes', this.recipe.id]);
    this.recipeService.setSelectedRecipe(this.recipe);
  }
}

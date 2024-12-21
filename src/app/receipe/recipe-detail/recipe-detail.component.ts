import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  selectedRecipe: Recipe;
  selectedId: string;
  constructor(
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.selectedRecipe = this.recipeService.getRecipeById(params.id);
        this.selectedId = params.id;
      },
    });
  }

  addItemToShoppingList() {
    // this.shoppingListService.addItemToIngredientsList()
    this.selectedRecipe.ingredients.forEach((item) =>
      this.shoppingListService.addItemToIngredientsList(item)
    );
  }

  editRecipe() {
    // this.router.navigate(['/recipes', this.selectedId, 'edit'])
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  recipeDelete(){
    this.recipeService.deleteRecipe(this.selectedId);
    this.router.navigate(['recipes'])
  }
}

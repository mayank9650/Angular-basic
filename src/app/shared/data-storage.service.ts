import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../receipe/receipe.model';
import { RecipeService } from '../receipe/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private httpService: HttpClient,
    private recipeService: RecipeService
  ) {}

  API_URL =
    'https://angular-recipe-5d509-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

  saveRecipe() {
    this.httpService
      .put(this.API_URL, this.recipeService.getRecipes())
      .subscribe({
        next: (response) => {
          console.log('response', response);
        },
      });
  }

  fetchRecipeList() {
    return this.httpService.get<Recipe[]>(this.API_URL).pipe(
      map((recipes) => {
        return recipes.map((item) => {
          return {
            ...item,
            ingredients: item.ingredients ?? [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
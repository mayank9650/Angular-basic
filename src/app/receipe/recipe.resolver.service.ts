import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './receipe.model';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();
    console.log('Resolver called. Recipes:', recipes);

    if (recipes.length === 0) {
      console.log('Fetching recipes from API...');
      return this.dataStorage.fetchRecipeList();
    } else {
      console.log('Recipes already loaded:', recipes);
      return recipes;
    }
  }
}

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './receipe.model';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private dataStorage: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.dataStorage.fetchRecipeList()
  }
}

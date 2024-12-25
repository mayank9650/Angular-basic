import { RouterModule, Routes } from '@angular/router';
import { ReceipeComponent } from './receipe/receipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './receipe/recipe-detail/recipe-detail.component';
import { EmptyRecipeComponent } from './receipe/empty-recipe/empty-recipe.component';
import { RecipeEditComponent } from './receipe/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './receipe/recipe.resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: ReceipeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EmptyRecipeComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {
          recipes: RecipeResolver
        },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {
          recipes: RecipeResolver
        },
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeDetailComponent } from './receipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './receipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './receipe/recipe-list/recipe-list.component';
import { ReceipeComponent } from './receipe/receipe.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeService } from './receipe/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.modules';
import { EmptyRecipeComponent } from './receipe/empty-recipe/empty-recipe.component';
import { RecipeEditComponent } from './receipe/recipe-edit/recipe-edit.component';
import { DataStorageService } from './shared/data-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthServiceService } from './auth/auth-service.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ReceipeComponent,
    DropdownDirective,
    EmptyRecipeComponent,
    RecipeEditComponent,
    AuthComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    DataStorageService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

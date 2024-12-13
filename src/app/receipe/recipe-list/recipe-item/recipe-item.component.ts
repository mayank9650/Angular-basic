import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../receipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeClick = new EventEmitter<Recipe>();

  onRecipeClick(){
    this.recipeClick.emit(this.recipe)
  }
}

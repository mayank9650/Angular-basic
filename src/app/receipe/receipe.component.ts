import { Component } from '@angular/core';
import { Recipe } from './receipe.model';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrl: './receipe.component.css',
})
export class ReceipeComponent {

  selectedRecipe: Recipe;

  onRecipeChange(selectedRecipe: Recipe){
    console.log('onRecipeChange', selectedRecipe);
    this.selectedRecipe = selectedRecipe
  }
}

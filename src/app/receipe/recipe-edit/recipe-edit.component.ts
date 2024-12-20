import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  get recipeIngredientControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe({
      next: (params) => {
        this.id = Number(params['id']);
        this.editMode = params['id'] !== null;
        this.initForm();
      },
    });
  }

  private initForm() {
    let recipeValues = {
      name: '',
      imagePath: '',
      description: '',
      recipeIngredients: new FormArray([]),
    };
    if (this.editMode) {
      const item = this.recipeService.getRecipeById(`${this.id}`);
      recipeValues.name = item.name;
      recipeValues.description = item.description;
      recipeValues.imagePath = item.imagePath;
      if (item.ingredients) {
        for (let ingredients of item.ingredients) {
          recipeValues.recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredients.name),
              amount: new FormControl(ingredients.amount),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeValues.name),
      imagePath: new FormControl(recipeValues.imagePath),
      description: new FormControl(recipeValues.description),
      ingredients: recipeValues.recipeIngredients,
    });
  }

  onRecipeSubmit() {
    console.log('form', this.recipeForm);
  }
}

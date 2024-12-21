import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../receipe.model';

export function atLeastOneIngredient(
  control: AbstractControl
): ValidationErrors | null {
  const formArray = control as FormArray;
  if (formArray.length === 0) {
    return { atLeastOneIngredient: true }; // Validation error
  }
  return null; // No error
}

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
    private recipeService: RecipeService,
    private router: Router
  ) {}

  get recipeIngredientControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.id = Number(params['id']);
          this.editMode = params['id'] !== null;
        }
      },
    });
    this.initForm();
  }

  private initForm() {
    let recipeValues = {
      name: '',
      imagePath: '',
      description: '',
      recipeIngredients: new FormArray([], atLeastOneIngredient),
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
              name: new FormControl(ingredients.name, [Validators.required]),
              amount: new FormControl(ingredients.amount, [
                Validators.required,
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeValues.name, [Validators.required]),
      imagePath: new FormControl(recipeValues.imagePath, [Validators.required]),
      description: new FormControl(recipeValues.description, [
        Validators.required,
      ]),
      ingredients: recipeValues.recipeIngredients,
    });
  }

  backToRecipe(){
    // Naviagte back to recipe page
    this.router.navigate(['recipes'])
  }

  onRecipeSubmit() {
    console.log('form', this.recipeForm);
    const ID = this.id ?? Date.now();
    const updatedRecipe: Recipe = {
      id: String(ID),
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
      imagePath: this.recipeForm.value.imagePath,
      ingredients: this.recipeForm.value.ingredients,
    };

    if (this.editMode) {
      this.recipeService.updateRecipe(updatedRecipe.id, updatedRecipe);
    } else {
      this.recipeService.addRecipes(updatedRecipe);
    }
    this.backToRecipe()
  }

  addNewIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
      })
    );
  }
  onItemsDelete(index: number) {
    console.log(index);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // this.recipeForm.updateValueAndValidity();
  }
}

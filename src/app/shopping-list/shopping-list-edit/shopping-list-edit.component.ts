import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements AfterViewInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('form') shoppingListForm: NgForm;

  shoppingListClickSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  editMode: boolean = false;
  editIndex: number = -1;
  // ngOnInit(): void {
  //   this.shoppingListClickSubscription =
  //     this.shoppingListService.selectedListItem.subscribe({
  //       next: (ingredient) => {
  //         console.log(ingredient);
  //       },
  //     });
  // }

  ngAfterViewInit(): void {
    this.shoppingListClickSubscription =
      this.shoppingListService.selectedListItem.subscribe({
        next: (index) => {
          const ingredient =
            this.shoppingListService.getIngredientByIndex(index);
          console.log(ingredient);
          this.shoppingListForm.setValue({
            name: ingredient.name,
            amount: ingredient.amount,
          });
          this.editMode = true;
          this.editIndex = index;
        },
      });
  }

  ngOnDestroy() {
    this.shoppingListClickSubscription.unsubscribe();
  }

  onClearClick(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.editIndex = -1;
  }

  onDeleteClick() {
    this.shoppingListService.deleteItemsByIndex(this.editIndex);
    this.editIndex = -1;
    this.editMode = false;
    this.shoppingListForm.reset()
  }

  onFormSubmit(form: NgForm) {
    console.log('form', form);
    const formValues = form.value;
    if (formValues.name && formValues.amount) {
      if (this.editMode) {
        this.shoppingListService.modifyItems({
          formValues,
          index: this.editIndex,
        });
        this.editMode = false;
        this.editIndex = -1;
      } else {
        this.shoppingListService.addItemToIngredientsList({
          name: formValues.name,
          amount: Number(formValues.amount),
        });
      }
      this.onClearClick(form);
    }
  }
}

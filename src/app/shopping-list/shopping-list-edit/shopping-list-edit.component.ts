import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  amountInput = '';

  @Output() addNewItem = new EventEmitter<Ingredient>();

  onAddNew() {
    if (this.nameInput.nativeElement.value && this.amountInput) {
      this.addNewItem.emit({
        name: this.nameInput.nativeElement.value,
        amount: Number(this.amountInput),
      });
      this.onClearClick();
    }
  }
  onClearClick() {
    this.amountInput = '';
    this.nameInput.nativeElement.value = '';
  }

  @HostListener('mouseenter') mouseEnter(eventData) {
    console.log('en', eventData);
  }

}

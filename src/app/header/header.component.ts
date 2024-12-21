import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedTab = '';
  @Output() tabClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService: DataStorageService) {}

  onTabClick(clickedTab: string) {
    this.selectedTab = clickedTab;
    this.tabClicked.emit(clickedTab);
  }

  saveData() {
    this.dataService.saveRecipe();
  }

  fetchRecipeData(){
    this.dataService.fetchRecipeList().subscribe()
  }
}

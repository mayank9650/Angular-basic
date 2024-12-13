import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showRecipe = true;

  onHeaderTabClicked(clickedTab: string) {
    if(clickedTab === 'recipe'){
      this.showRecipe = true
    } else {
      this.showRecipe = false
    }
  }
}

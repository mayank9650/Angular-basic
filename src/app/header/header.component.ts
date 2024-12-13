import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedTab = '';
  @Output() tabClicked: EventEmitter<string> = new EventEmitter<string>();

  onTabClick(clickedTab: string) {
    this.selectedTab = clickedTab
    this.tabClicked.emit(clickedTab)
  }
}

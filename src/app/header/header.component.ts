import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedTab = '';
  @Output() tabClicked: EventEmitter<string> = new EventEmitter<string>();
  isAuthenticated = false;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.authService.userSubject.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
      },
    });
  }

  onTabClick(clickedTab: string) {
    this.selectedTab = clickedTab;
    this.tabClicked.emit(clickedTab);
  }

  saveData() {
    this.dataService.saveRecipe();
  }

  fetchRecipeData() {
    this.dataService.fetchRecipeList().subscribe();
  }

  onLogoutClick() {
    this.authService.logout();
  }
}

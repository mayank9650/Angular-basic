import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // showRecipe = true;
  subscription: Subscription;

  constructor(private authService: AuthServiceService){}

  onHeaderTabClicked(clickedTab: string) {
    // if(clickedTab === 'recipe'){
    //   this.showRecipe = true
    // } else {
    //   this.showRecipe = false
    // }
  }

  ngOnInit() {
    // Create observable
    // const customIntervalObservable = Observable.create((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //     if(count > 7){
    //       observer.complete()
    //     }
    //   }, 1000);
    // });

    // this.subscription = customIntervalObservable.subscribe({
    //   next: (count: number) => {
    //     console.log('count', count);
    //   },
    // });

    this.authService.autoLogin()
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe()
  }
}

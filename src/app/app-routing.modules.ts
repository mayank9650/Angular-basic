import { RouterModule, Routes } from "@angular/router";
import { ReceipeComponent } from "./receipe/receipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list/shopping-list.component";
import { NgModule } from "@angular/core";

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        component: ReceipeComponent
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
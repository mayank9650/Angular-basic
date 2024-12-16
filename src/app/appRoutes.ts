import { Routes } from "@angular/router";
import { ReceipeComponent } from "./receipe/receipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list/shopping-list.component";

export const appRoutes: Routes = [
    {
        path: '',
        component: ReceipeComponent
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }
]
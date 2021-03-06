import { FavoritesComponent } from './favorites/favorites.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HomeComponent } from './home/home.component';
import { Routes} from "@angular/router";

export const appRoutes : Routes = [
  {path:'home', component:HomeComponent},
  {path:'acceuil', component:AcceuilComponent},
  {path:'favorits', component:FavoritesComponent},

  {path:'details', component:CardDetailsComponent},
  { path: '**', redirectTo: 'acceuil' , pathMatch: 'full'}
];

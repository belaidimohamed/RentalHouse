import { NotificationsComponent } from './notifications/notifications.component';
import { AddhouseComponent } from './_forms/addhouse/addhouse.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HomeComponent } from './home/home.component';
import { Routes} from "@angular/router";
import { HouseResolver } from './_resolvers/house-resolver';

export const appRoutes : Routes = [
  {path:'home', component:HomeComponent},
  {path:'acceuil', component:AcceuilComponent},
  { path: 'favorits', component: FavoritesComponent },
  {path:'notifcations', component:NotificationsComponent},
  {path:'details/:hid', component:CardDetailsComponent,
  resolve: { house : HouseResolver  }},
  {path:'addhouse', component:AddhouseComponent},

  { path: '**', redirectTo: 'home' , pathMatch: 'full'}
];

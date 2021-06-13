import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AddhouseComponent } from './_forms/addhouse/addhouse.component';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgxGalleryModule } from 'ngx-gallery-9';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './_forms/register/register.component';
import { CommentsComponent } from './card-details/comments/comments.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { appRoutes } from './routes';
import { SafePipe } from './_pipes/safe.pipe';
import { ToollistPipe } from './card-details/comments/toollist.pipe' ;
import { ImageUploadModule } from 'angular2-image-upload';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HouseResolver } from './_resolvers/house-resolver';
import { MatSliderModule } from '@angular/material/slider';
import { ReserveComponent } from './_forms/reserve/reserve.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CustomerComponent } from './customer/customer.component';


export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    CardDetailsComponent,
    AcceuilComponent,
    HomeComponent,
    FavoritesComponent,
    AddhouseComponent,
    SafePipe,
    ToollistPipe,
    CommentsComponent,
    ReserveComponent,
    NotificationsComponent,
      CustomerComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatDialogModule,
    MatRadioModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    NgxGalleryModule,
    NgxSliderModule,
    AutocompleteLibModule,
    MatSliderModule,

    ImageUploadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
    HouseResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterComponent,
  ]
})
export class AppModule { }

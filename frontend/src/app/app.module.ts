import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AddhouseComponent } from './_forms/addhouse/addhouse.component';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

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
import { ImageUploadModule } from 'angular2-image-upload';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



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
    CommentsComponent,
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

    ImageUploadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterComponent,
  ]
})
export class AppModule { }

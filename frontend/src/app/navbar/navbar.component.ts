import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { RegisterComponent } from './../_forms/register/register.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  width = '40%' ;
  name : string = 'guest';
  constructor(
    private dialog: MatDialog,
    private auth : AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }
  loggedIn(){
    return this.auth.loggedIn();
  }
  openEditProfileForm() {
    console.log('h');
  }
  logout() {
    localStorage.clear();
    this.alertify.warning('logged out succefully ! ');
  }
  openRegister(key: number) {
    if(key==2) {
      this.width ="60%"
    }
    this.dialog.open(RegisterComponent, {
      disableClose: false,
      autoFocus : true,
      width: this.width,
      data:  {key: key},
    });
  }

}

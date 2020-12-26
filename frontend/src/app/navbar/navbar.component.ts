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
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

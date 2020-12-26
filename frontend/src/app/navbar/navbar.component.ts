import { RegisterComponent } from './../_forms/register/register.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openRegister(key: number) {
    this.dialog.open(RegisterComponent, {
      disableClose: true,
      autoFocus : true,
      width: '40%',
      data:  {key: key},
    });
  }

}

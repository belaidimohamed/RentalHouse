import { NotifService } from './../_services/notif.service';
import { PostService } from './../_services/Post.service';
import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { RegisterComponent } from './../_forms/register/register.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GetService } from '../_services/Get.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  width = '40%' ;
  name: string = 'guest';
  notif : any = {}
  constructor(
    private post : PostService,
    private get: GetService,
    private dialog: MatDialog,
    private auth : AuthService,
    private alertify: AlertifyService ,
    private router: Router ,
    private notifService : NotifService
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.get.getNotif(parseInt(localStorage.getItem('id'))).subscribe(
      (result:any) => {
        this.notif = JSON.parse(result)
        this.notifService.changeData(this.notif)
      },
      error => {
        console.log(error)
      }
    )
  }
  loggedIn(){
    return this.auth.loggedIn();
  }
  openEditProfileForm() {
    console.log('h');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
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
  Vu() {
    if (this.notif.new != 0) {
      this.post.Vu({ 'new': this.notif.new }, parseInt(localStorage.getItem('id'))).subscribe(
      (result: any) => {
          this.notif = JSON.parse(result)
          this.notifService.changeData(this.notif)
      }
    )
    }
  }

}

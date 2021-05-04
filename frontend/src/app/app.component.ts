import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  route = ''
  constructor(private auth: AuthService , private router : Router) {}
  ngOnInit(){
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
       this.route = e.url;
       console.log(this.route)
       console.log(this.route.includes('/home'))
      }
    });
    this.auth.username = localStorage.getItem('name');
  }
}

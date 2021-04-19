import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello';
  constructor(private auth: AuthService) {}
  ngOnInit(){
    this.auth.username = localStorage.getItem('name');
  }
}

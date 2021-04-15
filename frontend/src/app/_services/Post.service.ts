import { GlobalConstants } from './../global-constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  headers = new HttpHeaders({
    'Content-type': 'application/json',
    Authorization: 'Token ' + localStorage.getItem('token')
  } );

  constructor(private http: HttpClient, private authService: AuthService) { }
  baseUrl = GlobalConstants.apiURL ;

  AddField(model: any) {
    return this.http.post(this.baseUrl + 'field/', model);
  }
  publishHouse(model: any) {
    console.log(model);
    console.log(this.baseUrl + 'house/'+'1'+'/editHouse/');
    return this.http.post(this.baseUrl + 'house/'+'1'+'/editHouse/', model, { headers: this.headers});
  }
}

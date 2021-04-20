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
    const id = localStorage.getItem('id')
    return this.http.post(this.baseUrl + 'house/'+id+'/createHouse/', model, { headers: this.headers});
  }
  addComment(model: any , id: number) {
    return this.http.post(this.baseUrl + 'house/' + id + '/addComment/', model, { headers: this.headers});
  }
}

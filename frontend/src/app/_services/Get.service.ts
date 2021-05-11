import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from './../global-constant';

@Injectable({
  providedIn: 'root'
})
export class GetService {
    baseUrl = GlobalConstants.apiURL ;
    headers = new HttpHeaders({
        Authorization: 'Token ' + localStorage.getItem('token')
    } );
    constructor(private http: HttpClient, private authService: AuthService) { }

    getComments(id: number) {
        return this.http.get(this.baseUrl + 'house/' + id + '/getComments/' , {headers: this.headers});
      }
    getHouses(){
      return this.http.get(this.baseUrl + 'house/getHouses/',{headers: this.headers})
    }
    getHouse(model:any,id:number) {
      return this.http.post(this.baseUrl + 'house/' + id + '/getHouse/',model,{headers: this.headers})
    }
    getProfile(id:number) {
      return this.http.get(this.baseUrl + 'profile/' + id + '/getProfile/',{headers: this.headers})
    }
    getFavorits(id:number) {
      return this.http.get(this.baseUrl + 'profile/' + id + '/getFavorits/',{headers: this.headers})
    }
}

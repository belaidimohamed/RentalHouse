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
  headers1 = new HttpHeaders({
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
  addLike(model: any, id: number) {
    return this.http.post(this.baseUrl + 'house/' + id + '/Like/' , model , { headers: this.headers1 });
  }
  addReply(model: any, id: number) {
    return this.http.post(this.baseUrl + 'house/' + id + '/Reply/' , model , { headers: this.headers1 });
  }
  deleteComment(model:any , id:number ) {
    return this.http.post(this.baseUrl + 'house/' + id + '/deleteComment/' , model , { headers: this.headers1 });
  }
  deleteReply(model:any , id:number) {
    return this.http.post(this.baseUrl + 'house/' + id + '/deleteReply/' , model , { headers: this.headers1 });
  }
  addToFavorits(model:any , id:number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/addToFavorits/' , model , { headers: this.headers1 });
  }
  removeFavorit(model:any , id:number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/removeFavorit/' , model , { headers: this.headers1 });
  }
  filtrer(model:any) {
    return this.http.post(this.baseUrl + 'house/filtrer/',model ,{headers: this.headers});
  }
  deleteHome(model: any, id: number) {
    return this.http.post(this.baseUrl + 'house/' + id + '/deleteHouse/' , model , { headers: this.headers1 });
  }
  reserve(model: any, id: number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/reserveHouse/' , model , { headers: this.headers1 });
  }
  cancelReserve(model:any , id:number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/cancelReserve/' , model , { headers: this.headers1 });
  }
  Vu(model:any , id:number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/Vu/' , model , { headers: this.headers1 });
  }
  getSpecificHouses(model:any) {
    return this.http.post(this.baseUrl + 'house/getSpecificHouses/' , model , { headers: this.headers1 });
  }
  accept(model:any,id:number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/acceptReserve/' , model , { headers: this.headers1 });
  }
  decline(model:any,id:number) {
    return this.http.post(this.baseUrl + 'profile/' + id + '/declineReserve/' , model , { headers: this.headers1 });
  }
  changeCoordinate(model:any,id:number) {
    return this.http.post(this.baseUrl + 'house/' + id + '/changeCoordinate/' , model , { headers: this.headers1 });
  }
}

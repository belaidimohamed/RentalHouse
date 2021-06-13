import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { GetService } from '../_services/Get.service';

@Injectable()
export class HouseResolver implements Resolve<any> {
  who : string
  constructor(private get: GetService , private auth : AuthService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // tslint:disable-next-line: radix
    this.who = 'none';
    if ( this.auth.loggedIn() ) {
      this.who = 'client';
    }
    console.log(this.who)

    return this.get.getHouse({"uid":localStorage.getItem('id'),"who":this.who},parseInt(route.paramMap.get('hid'))).pipe(
        map((results:any) => {
          return JSON.parse(results);
    })); }
}

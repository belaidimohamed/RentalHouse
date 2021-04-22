import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { GetService } from '../_services/Get.service';

@Injectable()
export class HouseResolver implements Resolve<any> {
  constructor(private get: GetService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // tslint:disable-next-line: radix
    return this.get.getHouse(parseInt(route.paramMap.get('cid'))).pipe(
        map((results:any) => {
          return JSON.parse(results);
    })); }
}

import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constant';
import { GetService } from '../_services/Get.service';

import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})

export class AcceuilComponent implements OnInit {
  houses : any;
  baseUrl = GlobalConstants.apiURL ;
  keyword = 'name';
  states = [];
  model: any = {'type':"S+1",'images':[]};
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return   value +' DT';
        case LabelType.High:
          return  value+' DT' ;
        default:
          return  value + 'DT';
      }
    }
  };

  constructor(private Get: GetService ) { }

  ngOnInit() {
    this.getHouses();
  }
  getHouses() {
    this.Get.getHouses().subscribe(
      (data:any) => { // data : string ==> json   django : list -> http (jamad ,json, string) tir fel hwee chwaya -> tahbet fel front end mayta jamad -> traje3ha 7aya bel json parse
        this.houses = JSON.parse(data);
      },
      error => { console.log(error)}
    )
  }

}

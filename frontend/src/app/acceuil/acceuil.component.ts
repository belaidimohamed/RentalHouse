import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { PostService } from 'src/app/_services/Post.service';
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

  houses: any;
  hover: false;
  userId: number;
  baseUrl = GlobalConstants.apiURL ;
  keyword = 'name';
  states = [];

  filtre: any = {'location':null,'type':'Choose house type','minValue':0,'maxValue':1000};
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

  constructor(
      private Get: GetService,
      private alertify : AlertifyService,
      private post: PostService,
      public auth: AuthService) { }

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('id'));
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
  formatLabel(value: number) {
      return Math.round(value / 5) + ' dt';
  }

  reset() {
    this.filtre = { 'location': null, 'type': 'Choose house type', 'minValue': 0, 'maxValue': 1000 };
    this.getHouses()
  }
  filtrer() {
    this.post.filtrer(this.filtre).subscribe((response:any) => {
      this.houses = JSON.parse(response);
    });
  }
  DeleteHouse(house: number) {
    this.post.deleteHome({ "owner": this.userId }, house).subscribe(() => {
      this.getHouses()
      this.alertify.warning('House deleted !')
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constant';
import { GetService } from '../_services/Get.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  houses : any;
  baseUrl = GlobalConstants.apiURL ;

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

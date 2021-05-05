import { GetService } from './../_services/Get.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constant';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorits : any ;
  baseUrl = GlobalConstants.apiURL ;

  constructor(private Get: GetService ) { }

  ngOnInit() {
    this.getFavorits();
  }
  getFavorits() {
    this.Get.getFavorits(parseInt(localStorage.getItem('id'))).subscribe(
      (data:any) => {
        this.favorits = JSON.parse(data);
        console.log(this.favorits)
      },
      error => { console.log(error)}
    )
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  Htype = ['s+0','s+1','s+2','s+3','others'] /* Htype stand for house type */

  numbers = [1,2,3,4,5,6,7,8,9]
  constructor() { }

  ngOnInit() {
  }

}

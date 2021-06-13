import { GetService } from './../_services/Get.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers :any ;
  constructor(
    private Get: GetService,
  ) { }

  ngOnInit() {
    this.Get.getAccepted(parseInt(localStorage.getItem('id'))).subscribe(
      (response:any) => {
        this.customers = JSON.parse(response)
        console.log(this.customers)
      }
    )
  }

}

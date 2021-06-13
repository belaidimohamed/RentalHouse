import { GetService } from './../_services/Get.service';
import { PostService } from 'src/app/_services/Post.service';
import { NotifService } from './../_services/notif.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constant';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  data :any;
  requests: any;
  baseUrl = GlobalConstants.apiURL ;
  constructor(
    private get : GetService,
    private post : PostService,
    private notifService : NotifService,
  ) { }

  ngOnInit(): void {
    this.notifService.currentMessage.subscribe(message => {
      this.data = message;
     this.getspecificHouse()
     console.log(this.requests)
    });
  }
  getspecificHouse() {
    this.post.getSpecificHouses(this.data.reservations).subscribe(
      (ticket: any) => {
        console.log(ticket);
        this.requests = JSON.parse(ticket);
      })
  }
  getnotif(){
    this.get.getNotif(parseInt(localStorage.getItem('id'))).subscribe(
      (result:any) => {
        this.data = JSON.parse(result)
        this.notifService.changeData(this.data)
      },
      error => {
        console.log(error)
      }
    )
  }
  acceptReserve(model:any) {
    this.post.accept(model,JSON.parse(localStorage.getItem('id'))).subscribe((response)=>{
      this.getnotif();
      this.getspecificHouse();
    },
    error => {
      console.log(error)
    })
  }
  decline(model:any) {
    this.post.decline(model,JSON.parse(localStorage.getItem('id'))).subscribe((response)=>{
      this.getnotif();
      this.getspecificHouse()
    },
    error => {
      console.log(error)
    })
  }

}


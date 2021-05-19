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
    private post : PostService,
    private notifService : NotifService,
  ) { }

  ngOnInit(): void {
    this.notifService.currentMessage.subscribe(message => {
      this.data = message;
      this.post.getSpecificHouses(this.data.reservations).subscribe(
        (ticket: any) => {
          console.log(ticket);
          this.requests = JSON.parse(ticket);
        })
    });
  }

}


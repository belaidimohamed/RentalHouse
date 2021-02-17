import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  galleryOptions : any = {};
  galleryImages : any ;
  constructor() { }

  ngOnInit(): void {
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100 ,
      thumbnailsColumns: 4,
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false
    }]
    this.galleryImages = [
      {
        small:'/assets/house1.jpeg',
        medium: '/assets/house1.jpeg',
        big: '/assets/house1.jpeg'
      },
      {
        small:'/assets/house2.jpeg',
        medium: '/assets/house2.jpeg',
        big: '/assets/house2.jpeg'
      },
      {
        small:'/assets/house3.jpeg',
        medium: '/assets/house3.jpeg',
        big: '/assets/house3.jpeg'
      },
      {
        small:'/assets/house4.jpg',
        medium: '/assets/house4.jpg',
        big: '/assets/house4.jpg'
      }
      ]
  }


}

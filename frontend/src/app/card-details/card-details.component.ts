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
  favbuttons = true ;
  coord = '';

  positionMap = {
    Coordinates : "36.775611, 8.669139",
  };
  mapsURL = `https://maps.google.com/maps?q=${this.positionMap.Coordinates}&t=&z=20&ie=UTF8&iwloc=&output=embed`;

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '530px',
        thumbnailsColumns: 4,
        previewCloseOnClick: true,
        previewCloseOnEsc:true,
        previewKeyboardNavigation:true,
        previewInfinityMove:true,
        imageArrowsAutoHide:true,
        imageSwipe:true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 1090,
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ]
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

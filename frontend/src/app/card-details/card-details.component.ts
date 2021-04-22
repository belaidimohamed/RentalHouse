import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation } from 'ngx-gallery-9';
import { GlobalConstants } from '../global-constant';
import { GetService } from '../_services/Get.service';

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
  profile: any ;
  house: any ;

  baseUrl = GlobalConstants.apiURL ;

  positionMap = {
    Coordinates : "36.775611, 8.669139",
  };
  mapsURL = `https://maps.google.com/maps?q=${this.positionMap.Coordinates}&t=&z=20&ie=UTF8&iwloc=&output=embed`;

  constructor(
    private get : GetService ,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.house = this.route.snapshot.data.house ;
      this.makeGallery(this.house.images);
    });

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

  }
  makeGallery(photos: any) {
    this.galleryImages = [] ;
    console.log("test 3")
    photos.forEach(element => {
      this.galleryImages.push({
        small: this.baseUrl + 'media/'+ element.image,
        medium:  this.baseUrl + 'media/'+ element.image,
        big:  this.baseUrl + 'media/'+ element.image,
      })
    });
    console.log(this.galleryImages)
  }}

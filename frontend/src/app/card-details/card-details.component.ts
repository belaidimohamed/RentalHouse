import { AuthService } from './../_services/auth.service';
import { ReserveComponent } from './../_forms/reserve/reserve.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PostService } from 'src/app/_services/Post.service';
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
  id: number;
  positionMap = { Coordinates : "Tunisia" };
  baseUrl = GlobalConstants.apiURL ;


  mapsURL = ``

  constructor(
    private dialog : MatDialog,
    private alertify: AlertifyService,
    private post : PostService,
    public auth : AuthService ,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem('id'))
    this.route.params.subscribe(params => {
      this.house = this.route.snapshot.data.house ;

      this.positionMap.Coordinates = this.house.coordinates
      this.mapsURL = `https://maps.google.com/maps?q=${this.positionMap.Coordinates}&t=&z=20&ie=UTF8&iwloc=&output=embed`;

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
    if (photos.length==0){
        this.galleryImages.push({
          small: '../../assets/house-placeholder.jpg',
          medium: '../../assets/house-placeholder.jpg' ,
          big: '../../assets/house-placeholder.jpg' ,
      });
    }
    else {
      photos.forEach(element => {
        this.galleryImages.push({
          small: this.baseUrl + 'media/'+ element.image,
          medium:  this.baseUrl + 'media/'+ element.image,
          big:  this.baseUrl + 'media/'+ element.image,
        })
      });
    }
  }
  addToFavorits() {
    this.post.addToFavorits( this.house.id ,parseInt(localStorage.getItem('id')) ).subscribe(
      () => {
        this.alertify.success('House added to favorits succefully !'),
        this.house.favorit = 'favorit' ;
      },
      error => this.alertify.warning('You already reserved or added this house to favorits')
    )
  }
  removeFavorit() {
    this.post.removeFavorit( this.house.id ,parseInt(localStorage.getItem('id')) ).subscribe(
      () => {
        this.alertify.success('House removed from favorits succefully !'),
        this.house.favorit = false;
      },
      error => this.alertify.warning('You already removed this house from favorits')
    )
  }
  reserve() {
     this.dialog.open(ReserveComponent, {
      disableClose: false,
      autoFocus : true,
      width: "40%",
      data:  {'hid': this.house.id,'dispo': parseInt(this.house.max) - parseInt(this.house.accepted) },
    }).afterClosed().subscribe( (res) => {
      if (res.data != true && res.data != false)
        this.alertify.error(res.data)
      if (res.data == true) {
        this.alertify.success('Reservation completed')
        this.house.favorit = 'pending';
      }

    });;
  }
  cancelR() {
    this.post.cancelReserve({ 'hid': this.house.id },  parseInt(localStorage.getItem('id'))).subscribe(
      () => {
        this.alertify.message('Registration has been canceled');
        this.house.favorit = false ;
      },
      error => {this.alertify.error(error)}
    )
  }
  save() {
    this.post.changeCoordinate({'coord':this.coord}, this.house.id).subscribe(
      () => {
        this.alertify.message('Changed succefuly ');
        this.mapsURL = `https://maps.google.com/maps?q=${this.coord}&t=&z=20&ie=UTF8&iwloc=&output=embed`;

      },
      error => {this.alertify.error(error)}
    )
  }
}

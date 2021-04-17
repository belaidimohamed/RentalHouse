import { ActivatedRoute , Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GetService } from './../../_services/Get.service';
import { PostService } from 'src/app/_services/Post.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
  })

  export class CommentsComponent implements OnInit {
    pid: number ;
    model: any = {};
    click = false ;
    comments: any ;
    onFocusComment = false ;
    onFocusCommentArea = false ;
    buttonCommentMargin = 50 ;
    comment = '';

    constructor(private route: ActivatedRoute, private apiPost: PostService, private router: Router,
      private apiGet: GetService, private alertify: AlertifyService) { }
    ngOnInit() {
      this.route.params.subscribe(data => { this.pid = data.pId; });
      this.apiGet.getComments(this.pid).subscribe((data: string) => {
        this.comments = JSON.parse(data) ;
      });
    }

    FocusComment() {
      if (!this.click) {
        this.onFocusCommentArea = !this.onFocusCommentArea;
        if (this.comment == '') {
          this.onFocusComment = ! this.onFocusComment ;
          this.buttonCommentMargin = 50;
        }
        else if (this.comment != '' && this.onFocusCommentArea) { 
          this.buttonCommentMargin = 50;
        } 
        else { 
          this.buttonCommentMargin = 18;
         } }
      else {
        this.click = !this.click ;
      }
    }

    cancelComment() {
      this.comment = '' ;
      this.onFocusComment = false ;
      this.onFocusCommentArea = false ;
      this.click = true ;
    }

    SendComment() {

      this.model.comment = this.comment ;
      this.model.user = parseInt(localStorage.getItem('id'));
      this.model.jaims = [] ;
      this.model.reponses = {} ;
      this.model.time = new Date();
  
      this.apiPost.addComment(this.model, this.pid).subscribe(
        () => { this.alertify.success('Comment sent successfully');
                this.apiGet.getComments(this.pid).subscribe((data: string) => {
                  this.comments = JSON.parse(data) ;
                });
        },
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
      this.cancelComment();
    }
  }
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
    cid: number ;
    color = "grey";
    like: any = {} ;
    model: any = {};
    reponse: any = {};
    click = false ;
    comments: any ;
    onFocusComment = false ;
    onFocusCommentArea = false ;
    buttonCommentMargin = 40 ;
    comment = '';

    onclickReponse = [] ;
    onFocusReponse = false ;
    onFocusReplyArea = false;
    reply = '' ;
    tab: any = {};
    buttonReplyMargin = 40 ;

    constructor(private route: ActivatedRoute, private apiPost: PostService, private router: Router,
      private apiGet: GetService, private alertify: AlertifyService) { }
    ngOnInit() {
      this.route.params.subscribe(data => { this.cid = data.cid; });
      this.apiGet.getComments(this.cid).subscribe((data: string) => {
        this.comments = JSON.parse(data) ;
      });
    }

    FocusComment() {
      if (!this.click) {
        this.onFocusCommentArea = !this.onFocusCommentArea;
        if (this.comment == '') {
          this.onFocusComment = ! this.onFocusComment ;
          this.buttonCommentMargin = 40;
        }
        else if (this.comment != '' && this.onFocusCommentArea) {
          this.buttonCommentMargin = 40;
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
      this.model.reponses = [] ;
      this.model.time = new Date();

      this.apiPost.addComment(this.model, this.cid).subscribe(
        () => { this.alertify.success('Comment sent successfully');
                this.apiGet.getComments(this.cid).subscribe((data: string) => {
                  this.comments = JSON.parse(data) ;
                });
        },
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
      this.cancelComment();
    }
    LikeComment(cid: number) {
      this.like.commentId = cid ;
      this.like.userId = parseInt(localStorage.getItem('id'));
      this.apiPost.addLike(this.like, this.cid).subscribe(
        () => {
                this.apiGet.getComments(this.cid).subscribe((data: string) => {
                  this.comments = JSON.parse(data) ;
                });
        },
        error => {
          console.log(error);
          this.alertify.error(error); },
       );
    }
    getcolor(cid: number) {
      this.color = "grey"
      this.comments[cid].jaims.forEach(element => {
        if (parseInt(localStorage.getItem('id')) == element.id)
        {this.color = "rgb(51, 151, 21)"}
      });
       return this.color
    }
    clickReply(cid: number) {
      this.comments.forEach(element => {
        if (cid == element.id)
          { 
            if (this.onclickReponse[element.id] == true)
            { this.onclickReponse[element.id] = false ;}
            else {this.onclickReponse[element.id] = true ;}
          }  
        else {this.onclickReponse[element.id] = false;}
      });
    }
    FocusReponse() {
      this.onFocusReplyArea = !this.onFocusReplyArea;
  
      if (this.reply == '') {
        this.onFocusReponse = ! this.onFocusReponse ;
      } else if (this.reply != '' && this.onFocusReplyArea) {
        this.buttonReplyMargin = 40;
      } else {
        this.buttonReplyMargin = 18;
      }
    }
    cancelReply() {
      this.reply = '' ;
      this.onFocusReponse = false ;
      this.onFocusReplyArea = false ;
    }
    SendReply(cid: number) {
      this.reponse.commentid = cid ;
      this.reponse.reply = this.reply ;
      this.reponse.userid = parseInt(localStorage.getItem('id'));
      this.reponse.time = new Date();

      this.apiPost.addReply(this.reponse, this.cid).subscribe(
        () => { this.alertify.success('Reply sent successfully');
                this.apiGet.getComments(this.cid).subscribe((data: string) => {
                  this.comments = JSON.parse(data) ;
                });
        },
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
      this.cancelReply();
    }
  }

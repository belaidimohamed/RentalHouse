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
    hid:number ;
    userId: number ;

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
      this.userId = parseInt(localStorage.getItem('id'));
      this.route.params.subscribe(data => { this.hid = data.hid; });

      this.apiGet.getComments(this.hid).subscribe((data: string) => {
        this.comments = JSON.parse(data) ;
      });
    }

    // ----------------------------------------------------------- comment stuff ---------------------------------------------------------------------

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
      this.model.user = this.userId
      this.model.jaims = [] ;
      this.model.reponses = [] ;
      this.model.time = new Date();

      this.apiPost.addComment(this.model, this.hid).subscribe(
        () => {
          this.alertify.success('Comment sent successfully');
          this.apiGet.getComments(this.hid).subscribe((data: string) => {
            this.comments = JSON.parse(data) ;
          }); },
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
      this.cancelComment();
    }

    DeleteComent(cid:number) {

      this.apiPost.deleteComment({'cid':cid ,'uid':this.userId} , this.hid ).subscribe(
        () => {
          this.alertify.message('Comment Deleted successfully !');
          this.apiGet.getComments(this.hid).subscribe((data: string) => {
            this.comments = JSON.parse(data) ;
          });},
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
    }

// ----------------------------------------------------------- Like stuff ---------------------------------------------------------------------

    LikeComment(cid: number) {
      this.like.commentId = cid ;
      this.like.userId = this.userId
      this.apiPost.addLike(this.like, this.hid).subscribe(
        () => {
                this.apiGet.getComments(this.hid).subscribe((data: string) => {
                  this.comments = JSON.parse(data) ;
                });
        },
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
    }
    getcolor(cid: number) {
      this.color = "grey";
      this.comments[cid].jaims.forEach(element => {
        if (this.userId == element.id)
        {this.color = "rgb(51, 151, 21)"}
      });
      return this.color
    }

// ------------------------------------------------------------ Reply stuff ---------------------------------------------------------------------
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
    cancelReply() {
      this.reply = '' ;
      this.onFocusReponse = false ;
      this.onFocusReplyArea = false ;
    }
    SendReply(cid: number) {
      this.reponse.commentid = cid ;
      this.reponse.reply = this.reply ;
      this.reponse.userid = this.userId
      this.reponse.time = new Date();

      this.apiPost.addReply(this.reponse, this.hid).subscribe(
        () => { this.cancelReply();
                this.clickReply(this.hid);
                this.apiGet.getComments(this.hid).subscribe((data: string) => {
                  this.comments = JSON.parse(data) ;
                });
        },
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
    }
    DeleteReply(rid : number, cid: number) {
      this.apiPost.deleteReply({'rid':rid,'cid':cid ,'uid':this.userId} , this.hid ).subscribe(
        () => {
          this.alertify.message('Reply Deleted successfully !');
          this.apiGet.getComments(this.hid).subscribe((data: string) => {
            this.comments = JSON.parse(data) ;
          });},
        error => {
          console.log(error);
          this.alertify.error(error); },
      );
    }
  }

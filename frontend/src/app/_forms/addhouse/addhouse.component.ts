import { PostService } from './../../_services/Post.service';
import { Component, OnInit } from '@angular/core';
import { FileHolder } from 'angular2-image-upload';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-addhouse',
  templateUrl: './addhouse.component.html',
  styleUrls: ['./addhouse.component.scss']
})
export class AddhouseComponent implements OnInit {

  selectedFile: ImageSnippet;
  maincolor: 'green';
  model: any = {'type':"S+1",'images':[]};
  customStyle = {
    selectButton: {
      "background-color": "grey",
      "padding": "11px",
      "border-radius": "5px",
      "color": "white"
    },
    clearButton: {
      "background-color": "red",
      "border-radius": "5px",
      "padding": "11px",
      "color": "#FFF",
      "margin-left": "10px"
    },
    layout: {
      "background-color": "#f7f7f7",
      "font-size": "11px",
      "margin": "4px",
      "padding": "9px",
      "border-style": "dotted",
      "border-width": "2px",
      "border-color": "gray",
    },
    previewPanel: {
      "background-color": "#f7f7f7",
    }
  }
  keyword = 'name';
  states = [
    ,'benzert'
    ,'jendouba'
    ,'tunis'
    ,'sfax'
    ,'ariana'
    ,'beja'
    ,'benarous'
    ,'gabes'
    ,'gafsa'
    ,'kairouan'
    ,'gasrin'
    ,'gbeli'

    ,'kef'
    ,'mehdia'
    ,'manouba'
    ,'mednin'
    ,'nabeul'
    ,'sidi bouzid'
    ,'siliana'
    ,'sousse'
    ,'tataouine'
    ,'tozeur'
    ,'zaghwan'
   ];
   loading:boolean=false;
   publishOpen: boolean =true;

  constructor(
    private post : PostService,
    private alertify: AlertifyService,
    private router: Router ){}


  ngOnInit() {

  }

  onUploadFinished(file: FileHolder) {
    this.publishOpen = true
    this.model.images.push(file);
  }
  onRemoved(file: FileHolder) {
    const index = this.model.images.indexOf(file);
    this.model.images.pop(index)
  }
  publish() {
    this.model.owner = localStorage.getItem('id');
    this.loading = true
    this.post.publishHouse(this.model).subscribe(
      (response:any) => {
        this.loading = false
        this.alertify.success('house added !');
        this.router.navigate(['details/'+ response.id ])
      },
      error => {
        console.log(error)
        this.loading = false
      }
    );
  }


//   private onSuccess() {
//     this.selectedFile.pending = false;
//     this.selectedFile.status = 'ok';
//   }

//   private onError() {
//     this.selectedFile.pending = false;
//     this.selectedFile.status = 'fail';
//     this.selectedFile.src = '';
//   }

//   processFile(imageInput: any) {
//     const file: File = imageInput.files[0];
//     const reader = new FileReader();

//     reader.addEventListener('load', (event: any) => {

//       this.selectedFile = new ImageSnippet(event.target.result, file);
//       console.log(this.selectedFile);
//       this.selectedFile.pending = true;

//       const formData = new FormData();
//       if(this.selectedFile.file.type.includes("image")) {
//         formData.append('image', this.selectedFile.file);
//         this.onSuccess();
//       } else {
//         this.onError();
//       }
//     })
//     reader.readAsDataURL(file);
// }

}

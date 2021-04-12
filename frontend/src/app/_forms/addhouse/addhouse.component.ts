import { PostService } from './../../_services/Post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  states = ['Tunisia','Algeria','Manouba'];


  constructor(private imageService: PostService){}


  ngOnInit() {

  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
      this.selectedFile.pending = true;

      const formData = new FormData();
      if(this.selectedFile.file.type.includes("image")) {
        formData.append('image', this.selectedFile.file);
        this.onSuccess();
      } else {
        this.onError();
      }
    })
    reader.readAsDataURL(file);

}
}

import { PostService } from './../../_services/Post.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  model : any = {}
  constructor(
    private post : PostService,
    public dialogRef: MatDialogRef<ReserveComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.model.hid = this.data.hid;
  }
  save() {
    if (this.model.nbplaces > this.data.dispo) {
      this.dialogRef.close({ data: 'You reserved more places than is available' });
      return false;
    }

    this.post.reserve(this.model, parseInt(localStorage.getItem('id'))).subscribe(
      () => {
        this.dialogRef.close({ data: true });
      },
      error => this.dialogRef.close({data: 'You already reserved or added this house to favorits'})
    )
    return true;
  }

  cancelRegister(): void {
    this.dialogRef.close({data:false});
  }
}

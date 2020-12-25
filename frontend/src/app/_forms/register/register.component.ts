import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}


    ngOnInit(): void {
  }

  register() {
    console.log(this.model);
  }
  login() {
    console.log(this.model);
  }
  cancelRegister(): void {
    this.dialogRef.close();
  }


}

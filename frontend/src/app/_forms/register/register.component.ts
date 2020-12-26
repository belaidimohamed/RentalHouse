import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  list : string[] =  ['karay','yheb yekri' , 'lezouz'] ;
  toppings = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}


    ngOnInit(): void {
      console.log(this.data);
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

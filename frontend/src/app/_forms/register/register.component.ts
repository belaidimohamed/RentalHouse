import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RegisterComponent implements OnInit {
  model: any = {};
  list : string[] =  ['karay','yheb yekri' , 'lezouz'] ;
  toppings = new FormControl();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}


  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  print(object:any) {
    let message = '';
    let length = 0 ;
    let length1 = 0 ;
    if (object) {
      Object.keys(object).forEach(element => {
        length += 1;
        if(object[element].invalid && object[element].touched) {
          length1 += 1;
          if(Object.keys(object).length != length) // so the message dosen't appear like this 'email,name, is required'
            message = message + element + ' , ' ;
          else
            message = message + element + ' ' ;
        }
      });
      if(length1 == 1)
        message = message + 'is required';
      else
        message = message + 'are required';
    }
    return message
  }
  register() {
    this.auth.register(this.model);
    this.cancelRegister()
  }
  login() {
    this.auth.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in succefully ! ');
        this.cancelRegister() },
      error => {
        this.alertify.error('Wrong password or username !');
        this.cancelRegister()
      })
  }

  cancelRegister(): void {
    this.dialogRef.close();
  }


}

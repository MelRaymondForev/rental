import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  emailPattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorMessage: any;
  authService: any;
  successMessage: string;

  constructor(public afAuth: AngularFireAuth){}

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}

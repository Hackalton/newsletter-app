import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  username: string = '';
  password: string = '';
  role: string = '';
  signupUrl = 'http://localhost:3000/api/auth/signup';

  signupForm!:FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['student', Validators.required]
    });
  }


  onSubmit(): void{

    if(this.signupForm.valid){
      const formData = this.signupForm.value;
      const signupData = {
        username: formData.username,
        password: formData.password,
        role: formData.role
      }
    console.log('this is the form data...' + formData);
    fetch(this.signupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
    .then(
      response => response.json()
    ).catch(error => console.log(error))
  }
}
}

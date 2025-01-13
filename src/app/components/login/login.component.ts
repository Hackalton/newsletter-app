import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUrl = 'http://localhost:3000/api/auth/login';

  constructor(private router: Router, private http: HttpClient){}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)] ),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl('', [Validators.required])  //edited: student removed from role
  })
  onSubmit(){
    console.log(this.loginForm.value);
      this.http.post<{token: string, role: string}>(this.loginUrl, this.loginForm.value).subscribe((data)=>{
      console.log('this is the user logging in...' + this.loginForm.value);
      console.log('the data is ' + data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      //redirection
      if(data.role ==='admin'){
        this.router.navigate(['/admin-home']);
      }else if(data.role==='journalist'){
        this.router.navigate(['/journalist-home']);
      }
      else if(data.role ==='student'){
        this.router.navigate(['/student-home'])
      }
      else{
        this.router.navigate(['/login'])
      } 
    },
    (err)=>{
      alert("Invalid credentials");
      console.log('invalid credentials supplied to login...');
    }

  )}

  // onSubmit(){
  //   const loginData = {
  //     username: this.username,
  //     password: this.password
  //   }


  //   )

  // }
  

}

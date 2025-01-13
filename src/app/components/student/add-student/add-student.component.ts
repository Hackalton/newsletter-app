import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit{

  signupUrl = 'http://localhost:3000/api/auth/signup';
  signupForm!:FormGroup;


  constructor(private svc: StudentService, private fb: FormBuilder, private router: Router){}
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', Validators.required]
    });
  }

  addStudent = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  });

  saveStudent(){
    this.svc.createStudent(this.addStudent.value).subscribe((data:any)=>{
      console.log(data);
    })
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
      ()=>{console.log('new student added!')}
    ).catch(error => console.log(error));
  }
}

}

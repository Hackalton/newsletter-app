import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  message: boolean = false;
  updatedStudent: any;
  currentStudent: any;

  // Initialize the form
  updateStudentForm = new FormGroup({
    username: new FormControl(``),
    password: new FormControl(``)
  })

  constructor(
    private svc: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get student ID
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('The fetched id is: ' + id);
      this.getById(id)
    });
  }

  // Fetch student data by ID
  getById(id: any) {
    this.svc.getStudentById(id).subscribe((data) => {
      console.log('Fetched student data:', data);
      this.currentStudent = data.result;
      console.log('the current student is: ' + Object.entries(this.currentStudent));
      console.log('the current username is ' + this.currentStudent.username);
      this.updateStudentForm.value.username = this.currentStudent.username;
      console.log('the current password is ' + this.currentStudent.password);
      this.updateStudentForm.value.password = this.currentStudent.password;
    });
  }



  // Save data and update the student
  saveData() {
    this.updatedStudent = {...this.updateStudentForm.value, _id: ''};
    console.log('Updated student data:', this.updatedStudent);
    const id = this.route.paramMap.subscribe((params)=>{
      let _id = params.get('id');
      this.updatedStudent = {...this.updateStudentForm.value, _id: params.get('id')};
      this.showMessage();
      
    })
    console.log('the active id is:')
    this.svc.updateStudent(this.updatedStudent._id, this.updatedStudent).subscribe(
      (response) => {
        console.log('Student updated successfully', response);
        // Navigate to a different route (e.g., back to student list)
        this.router.navigate(['/admin-home']);
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }

  // Show or hide message
  removeMessage() {
    this.message = false;
  }

  showMessage() {
    setTimeout(() => {
      this.message = true;
    }, 3000);
  }
}

import { Component, NgModule, OnInit } from '@angular/core';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink, FormsModule],
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.css'
})
export class ListStudentComponent implements OnInit{
  allStudents: any =[];
  constructor(private svc: StudentService){}
  ngOnInit(): void {
    this.getAllStudents();
    console.log("the list student component at work!")
  }
  getAllStudents(){
    this.svc.getStudents().subscribe((data=>{
      console.log(data);
      this.allStudents = Object.values(data)[1];
    }))
  }
   //deleting a student
  deleteStudent(id: any){
    this.svc.deleteStudent(id).subscribe((data:any)=>{
      console.log(id);
      this.svc.deleteStudent(id);
    this.ngOnInit();
    })
  }

}

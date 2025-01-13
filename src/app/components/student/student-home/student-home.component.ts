import { Component, NgModule, OnInit } from '@angular/core';
import { Newsletter } from '../../../models/newsletter';
import { JournalistService } from '../../../services/journalist.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';


@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit{

  allNewsletters: Newsletter[] =[];

  constructor(private svc: StudentService){}
  ngOnInit(): void {
    console.log('This is student home-page!');
    this.getAllNewsletter();
  }
  //To get all newsletters using the svc
  getAllNewsletter(){
    this.svc.getNewsletters().subscribe((data)=>{
      console.log('this is the news: '+Object.values(data)[1])
      this.allNewsletters = Object.values(data)[1];
      console.log(this.allNewsletters);
    })
  }
  getNewsletter(_id: string){
    this.svc.getNewsletter(_id).subscribe((data=>{
      console.log('the single newsletter is: ' + data)
    }))
  }

// Modal related properties
isModalVisible = false; //return to false after editing the css
modalData: { title: string, content: string } | null = null;

// Function to open modal and show the selected newsletter content
openModal(item: { title: string, content: string }): void {
  this.modalData = item;
  this.isModalVisible = true;
}

// Function to close modal
closeModal(): void {
  this.isModalVisible = false;
  this.modalData = null;
}

}

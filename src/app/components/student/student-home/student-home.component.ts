import { Component, NgModule, OnInit } from '@angular/core';
import { Newsletter } from '../../../models/newsletter';
import { JournalistService } from '../../../services/journalist.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit{
  allNewsletters: Newsletter[] =[
    {title: 'Press Conference', content:'there was a press conference'},
    {title: 'Press Release', content:'there was a press release'},
    {title: 'Press meeting', content:'there was a press meeting'}
  ];
  constructor(private svc: JournalistService){}
  ngOnInit(): void {
    console.log('This is student home-page!');
  }
  //To get all newsletters using the svc



}

import { Component, OnInit } from '@angular/core';
import { Newsletter } from '../../models/newsletter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent implements OnInit{
  allNewsLetters: Newsletter[] =[];
  

  constructor(private svc: NewsletterService, private http: HttpClient){}

  ngOnInit(): void {
    //to be implemented
    this.getAllNewsletters();
  }
  getAllNewsletters(){
     this.svc.getNewsletters().subscribe(data=>{
      console.log(data)
     })
  }


}

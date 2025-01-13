import { Component, OnInit } from '@angular/core';
import { Newsletter } from '../../models/newsletter';
import { JournalistService } from '../../services/journalist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-journalist',
  standalone: true,
  imports: [],
  templateUrl: './journalist.component.html',
  styleUrl: './journalist.component.css'
})
export class JournalistComponent implements OnInit{

  allNewsletters: Newsletter[] = []
  constructor(private svc: JournalistService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //To get all newsletters using the svc
  getAllNewsletter(){
    this.svc.getNewsletters().subscribe((data)=>{
      console.log('this is the news: '+Object.values(data)[1])
      this.allNewsletters = Object.values(data)[1];
      console.log(this.allNewsletters);
    })
  }
  editNewsletter(_id: string, newsletter: any){
    this.svc.updateNewsletter(_id, newsletter).subscribe(result=>{
      console.log(result)
    })
  }
  deleteNewsletter(_id: string){
    this.svc.deleteNewsletter(_id).subscribe(result =>{
      console.log(result);
    })
  }
  addNewsletter(newsletter: Newsletter){
    this.svc.createNewsletter(newsletter).subscribe(result=>{
      console.log(result);
    })
  }
}

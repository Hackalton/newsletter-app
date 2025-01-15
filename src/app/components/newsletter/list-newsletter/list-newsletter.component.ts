import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../../services/newsletter.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { JournalistService } from '../../../services/journalist.service';

@Component({
  selector: 'app-list-newsletter',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterOutlet, CommonModule, NgFor],
  templateUrl: './list-newsletter.component.html',
  styleUrl: './list-newsletter.component.css'
})
export class ListNewsletterComponent implements OnInit{
    allNewsletters: any[] =[];
    constructor(private svc: NewsletterService){}
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
     //deleting a newsletter
    deleteNewsletter(id: any){
      this.svc.deleteNewsletter(id).subscribe((data:any)=>{
        console.log(id);
        this.svc.deleteNewsletter(id);
      this.ngOnInit();
      })}
  
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

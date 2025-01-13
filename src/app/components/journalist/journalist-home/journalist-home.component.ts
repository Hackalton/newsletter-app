import { Component } from '@angular/core';
import { JournalistService } from '../../../services/journalist.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-journalist-home',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './journalist-home.component.html',
  styleUrl: './journalist-home.component.css'
})
export class JournalistHomeComponent {

    allNewsletters: any[] =[];
    constructor(private svc: JournalistService){}
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

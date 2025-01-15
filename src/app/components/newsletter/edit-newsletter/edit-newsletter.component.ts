import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { Journalist } from '../../../models/journalist';
import { JournalistService } from '../../../services/journalist.service';
import { NewsletterService } from '../../../services/newsletter.service';

@Component({
  selector: 'app-edit-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-newsletter.component.html',
  styleUrl: './edit-newsletter.component.css'
})
export class EditNewsletterComponent implements OnInit{
  message: boolean = false;
    updatedNewsletter: any;
    currentNewsletter: any;
  
    // Initialize the form
    updateNewsletterForm = new FormGroup({
      title: new FormControl(``),
      content: new FormControl(``)
    })
  
    constructor(
      private svc: NewsletterService,
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
      this.svc.getNewsletter(id).subscribe((data) => {
        console.log('Fetched newsletter data:', data);
        this.currentNewsletter = data.result;
        console.log('the current newsletter is: ' + Object.entries(this.currentNewsletter));
        console.log('the current title is ' + this.currentNewsletter.title);
        this.updateNewsletterForm .value.title = this.currentNewsletter.title;
        console.log('the current content is ' + this.currentNewsletter.content);
        this.updateNewsletterForm .value.content = this.currentNewsletter.content;
      });
    }
  
  
  
    // Save data and update the student
    saveData() {
      this.updatedNewsletter = {...this.updateNewsletterForm .value, _id: ''};
      console.log('Updated newsletter data:', this.updatedNewsletter);
      const id = this.route.paramMap.subscribe((params)=>{
        let _id = params.get('id');
        this.updatedNewsletter = {...this.updateNewsletterForm .value, _id: params.get('id')};
        
      })
      console.log('the active id is:')
      this.svc.updateNewsletter(this.updatedNewsletter._id, this.updatedNewsletter).subscribe(
        (response) => {
          console.log('Newsletter updated successfully', response);
          // Navigate to a different route (e.g., back to student list)
          // this.router.navigate(['/newsletter']);
        },
        (error) => {
          console.error('Error updating newsletter:', error);
        }
      );
    }
  
    // Show or hide message
    removeMessage() {
      this.message = false;
    }
  
    showMessage() {
      this.message = true;
    }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { NewsletterService } from '../../../services/newsletter.service';

@Component({
  selector: 'app-create-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-newsletter.component.html',
  styleUrl: './create-newsletter.component.css'
})
export class CreateNewsletterComponent {


    newsletterUrl = 'http://localhost:3000/api/newsletter/create'; 
    newsletterForm!:FormGroup;
  
  
    constructor(private svc: NewsletterService, private fb: FormBuilder, private router: Router){}
    
    ngOnInit(): void {
      this.newsletterForm = this.fb.group({
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
        author: ['', Validators.required]
      });
    }
  
    addNewsletter = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      author: new FormControl('')
    });
  
    saveNewsletter(){
      this.svc.createNewsletter(this.addNewsletter.value).subscribe((data:any)=>{
        console.log(data);
      })
    }
  
    onSubmit(): void{
  
      if(this.newsletterForm.valid){
        const formData = this.newsletterForm.value;
        const newsletterFormData = {
          title: formData.title,
          content: formData.content,
          author: formData.author
        }
      console.log('this is the form data...' + formData);
      fetch(this.newsletterUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsletterFormData)
        
      })
      .then(
        ()=>{console.log('new newsletter added!')
          this.newsletterForm = this.fb.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]],
            author: ['', Validators.required]
          });
        }
      ).catch(error => console.log(error));
    }
  }
}

import { Injectable } from '@angular/core';
import { Newsletter } from '../models/newsletter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  allNewsletters: Newsletter[] =[];
  newsletterUrl = 'http://localhost:3000/api/newsletter';
  
  constructor(private http: HttpClient) { }

  getNewsletters(): Observable<any[]>{
    return this.http.get<Newsletter[]>(`${this.newsletterUrl}/retrieve`);
  }
  getNewsletter(_id: string): Observable<any>{
    return this.http.get<any>(`${this.newsletterUrl}/${_id}`);
  }
  deleteNewsletter(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.newsletterUrl}/${_id}`);
  }
  updateNewsletter(_id: string): Observable<any>{
    return this.http.put<any>(`${this.newsletterUrl}/update`, _id);
  }
  createNewsletter(newsletter: any): Observable<any>{
    return this.http.post<any>(`${this.newsletterUrl}/create`, newsletter);
  }
}

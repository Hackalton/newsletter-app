import { Injectable } from '@angular/core';
import { Newsletter } from '../models/newsletter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journalist } from '../models/journalist';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  allNewsletters: Newsletter[] =[];
  newsletterUrl = 'http://locahost:3000/api/newsletters';
  
  constructor(private http: HttpClient) { }

  getNewsletters(): Observable<any[]>{
    return this.http.get<Newsletter[]>(`${this.newsletterUrl}/retrieve`);
  }
  deleteNewsletter(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.newsletterUrl}/delete/${_id}`);
  }
  updateNewsletter(_id: string): Observable<any>{
    return this.http.put<any>(`${this.newsletterUrl}/update`, _id);
  }
  createNewsletter(journalist: Journalist): Observable<any>{
    return this.http.post<any>(`${this.newsletterUrl}/create`, journalist);
  }
}

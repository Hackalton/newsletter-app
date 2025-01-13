import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journalist } from '../models/journalist';
import { Newsletter } from '../models/newsletter';


@Injectable({
  providedIn: 'root'
})
export class JournalistService {

  newsletterUrl = 'http://locahost:3000/api/newsletter';
  journalistUrl = 'http://locahost:3000/api/journalist';
  constructor(private http: HttpClient) { }

  getJournalists(): Observable<any>{
    return this.http.get<any>(`${this.journalistUrl}/retrieve`);
  }
  deleteJournalist(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.journalistUrl}/${_id}`);
  }
  updateJournalist(_id: string): Observable<any>{
    return this.http.put<any>(`${this.journalistUrl}/update`, _id);
  }
  createJournalist(journalist: Journalist): Observable<any>{
    return this.http.post<any>(`${this.journalistUrl}/create`, journalist);
  }

    //the posts/newsletters

  
  createNewsletter(newsletter: Newsletter): Observable<any>{
    return this.http.post<any>(`${this.newsletterUrl}/create`, newsletter);
  }
  getNewsletters(): Observable<any[]>{
    return this.http.get<any[]>(`${this.newsletterUrl}/retrieve`);
  }
  getNewsletter(_id: string): Observable<any>{
    return this.http.get<any>(`${this.newsletterUrl}/${_id}`);
  }
  updateNewsletter(_id: string, newsletter: any): Observable<any>{
    return this.http.put<any>(`${this.newsletterUrl}/update/${_id}`, newsletter);
  }
  deleteNewsletter(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.newsletterUrl}/${_id}`);
  }

}

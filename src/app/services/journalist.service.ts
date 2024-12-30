import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journalist } from '../models/journalist';
import { Newsletter } from '../models/newsletter';


@Injectable({
  providedIn: 'root'
})
export class JournalistService {

  allJournalist: Journalist[] =[];
  newsletterUrl = 'http://locahost:3000/api/newsletters';
  journalistUrl = 'http://locahost:3000/api/journalist';
  constructor(private http: HttpClient) { }

  getJournalists(): Observable<any>{
    return this.http.get<any>(`${this.journalistUrl}/retrieve`);
  }
  deleteJournalist(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.journalistUrl}/delete/${_id}`);
  }
  updateJournalist(_id: string): Observable<any>{
    return this.http.put<any>(`${this.journalistUrl}/update`, _id);
  }
  createJournalist(journalist: Journalist): Observable<any>{
    return this.http.post<any>(`${this.journalistUrl}/create`, journalist);
  }

  getNewsletters(): Observable<any>{
    return this.http.get<Newsletter>(`${this.newsletterUrl}/retrieve`);
  }
}

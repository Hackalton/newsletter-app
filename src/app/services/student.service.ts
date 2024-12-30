import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  allStudent: Student[] =[];
  studentUrl ='';
  constructor(private http: HttpClient) { }

  getJournalists(): Observable<any>{
    return this.http.get<any>(`${this.studentUrl}/retrieve`);
  }
  deleteJournalist(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.studentUrl}/delete/${_id}`);
  }
  updateJournalist(_id: string): Observable<any>{
    return this.http.put<any>(`${this.studentUrl}/update`, _id);
  }
  createAdmin(student: Student): Observable<any>{
    return this.http.post<any>(`${this.studentUrl}/create`, student);
  }
}

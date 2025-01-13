import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  allStudent: Student[] =[];
  studentUrl ='http://localhost:3000/api/student'
  newsletterUrl ='http://localhost:3000/api/newsletter'
  constructor(private http: HttpClient) { }

  getStudents(): Observable<any>{
    return this.http.get<any>(`${this.studentUrl}/retrieve`);
  }
  getStudentById(_id: any): Observable<any>{
    return this.http.get<any>(`${this.studentUrl}/${_id}`)  //define this in the backend
  }
  deleteStudent(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.studentUrl}/${_id}`);
  }
  updateStudent(_id: string, student: any): Observable<any>{
    return this.http.put<any>(`${this.studentUrl}/${_id}`, student);
  }
  createStudent(student: any): Observable<any>{
    return this.http.post<any>(`${this.studentUrl}/create`, student);
  }

  //newsletters
  getNewsletters(): Observable<any[]>{
    return this.http.get<any[]>(`${this.newsletterUrl}/retrieve`);
  }
  getNewsletter(_id: string): Observable<any>{
    return this.http.get<any>(`${this.newsletterUrl}/${_id}`);
  }
}

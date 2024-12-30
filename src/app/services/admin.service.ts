import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 allAdmins: Admin[] =[];
 adminUrl = '';
  constructor(private http: HttpClient) { }

  getAdmins(): Observable<any>{
    return this.http.get<any>(`${this.adminUrl}/retrieve`);
  }
  deleteAdmin(_id: string): Observable<any>{
    return this.http.delete<any>(`${this.adminUrl}/delete/${_id}`);
  }
  updateAdmin(_id: string): Observable<any>{
    return this.http.put<any>(`${this.adminUrl}/update`, _id);
  }
  createAdmin(admin: Admin): Observable<any>{
    return this.http.post<any>(`${this.adminUrl}/create`, admin);
  }
}

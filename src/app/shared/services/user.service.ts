import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model'; // adjust path as needed
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

   getUsers(filter: any = {}): Observable<User[]> {
     const apiUrl = `${this.baseUrl}/User/filter`; 
    // Default payload structure, can be customized when calling
    const defaultFilter = {
      firstName: null,
      lastName: null,
      email: null,
      role: null,
      roleId: null,
      activeStatus: null,
      orderBy: null,
      ascending: true
    };
    return this.http.post<User[]>(apiUrl, { ...defaultFilter, ...filter });
  }

  addAndUpdateUser(formData: User): Observable<User[]> {
    const apiUrl = formData?.id > 0 ? `${this.baseUrl}/User/update/${formData.id}`:
      `${this.baseUrl}/User`
    if (formData?.id > 0) {
      return this.http.put<User[]>(apiUrl, formData);
    } else {
      return this.http.post<User[]>(apiUrl, formData);
    }
  }



  updateUserStatus(payload:{id:number, status:number}): Observable<any> {
    const apiUrl = `${this.baseUrl}/User/updateStatus`
    return this.http.patch<any>(apiUrl, payload);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:5241/api/auth/login';

  constructor(private http: HttpClient) { }

  login(data: {email:string, pass:string}): Observable<any>{
    return this.http.post(this.url, data);
  }

  saveAuth(token: string, role: string): void{
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
  }

  register(data: {name:string, email:string, password:string}): Observable<any>{
    return this.http.post(this.url.replace('login', 'register'), data);
  }
  
  logout(): void{
    sessionStorage.clear();
  }
}
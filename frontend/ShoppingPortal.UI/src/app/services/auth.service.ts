import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:5241/api/auth/login';

  private roleSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('role'));
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(data: {email:string, pass:string}): Observable<any>{
    return this.http.post(this.url, data);
  }

  saveAuth(token: string, role: string): void{
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  register(data: {name:string, email:string, password:string}): Observable<any>{
    return this.http.post(this.url.replace('login', 'register'), data);
  }
  
  logout(): void{
    sessionStorage.clear();
    this.roleSubject.next(null);
  }
}
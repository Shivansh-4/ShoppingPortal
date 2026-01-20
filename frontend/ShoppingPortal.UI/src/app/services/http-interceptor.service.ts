import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>>{

    const token = sessionStorage.getItem('token');
  
    const finalReq = token?req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }):req;

    return next.handle(finalReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if(!error.url?.includes('/login')){
          if(error.status === 401){
            sessionStorage.clear();
            this.router.navigate(['/login']);
            alert("Session Expired. Please login again");
          }

          if(error.status === 403){
            alert('Access Denied');
          }
        }

        return throwError(() => error);
      })
    )
  }
}

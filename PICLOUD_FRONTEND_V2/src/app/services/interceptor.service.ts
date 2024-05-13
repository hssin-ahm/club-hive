import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private jwtService: JwtService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const jwtToken = this.jwtService.getToken();
      if (jwtToken && this.jwtService.isTokenExpired(jwtToken)) {
          this.jwtService.logout();  // Clear the token and handle logout process
          this.router.navigateByUrl('/auth/login');  // Redirect to login page
          return throwError(() => new Error('JWT token has expired and has been cleared'));
      } else if (jwtToken) {
          const clonedReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
          });
          return next.handle(clonedReq).pipe(
              catchError(error => {
                  // Optional: Handle specific HTTP errors if needed
                  if (error.status === 401) {
                      this.jwtService.logout();
                      this.router.navigateByUrl('/auth/login');
                  }
                  return throwError(error);
              })
          );
      }
      return next.handle(req);
  }
}

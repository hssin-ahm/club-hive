import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ClubService } from './club.service';
import { environment } from 'src/environments/environment';


const BASE_URL = [environment.uri + "/auth/"]
const API_BASE_URL = environment.uri + "/";
const url = environment.uri + "/users";

export interface User {
  id: number;
  email: string;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private router:Router,

    private userService:UserService,
    private clubService:ClubService
  ) { }


  // ...........................................Authentication............................................

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log('Error status:', error.status);
            console.log('Error body:', error.error);
            return throwError(error);
        })
    );
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest).pipe(
      catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error.error);
          return throwError(() => new Error(error.error || 'Unknown error'));
      })
    );
  }


  getEmailFromToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return null;
    }

    

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    console.log(payload);

    return payload.sub;
  }

  getUserByEmail(email) {
    return this.http.get(url + '/findByEmail/' + email, {
      headers: this.createAuhtorizationHeader(),
    });
  }


//   getUserByEmail(email: string): Observable<User> {
//     return this.http.get<User>(`${API_BASE_URL}/users/findByEmail/${email}`);
// }

  logout(): void {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    localStorage.clear();
    // Optionally, navigate the user to the login page
    this.router.navigate(['/auth/login']);
  }


  // Add this method to your JwtService
  forgotPassword(email: string): Observable<any> {
    return this.http.get(API_BASE_URL + 'forgot-password', {
      params: { email: email },
      responseType: 'text'  // Add this line
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  setPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(API_BASE_URL + 'set-password', null, {
      params: { email: email },
      headers: new HttpHeaders().set('newPassword', newPassword),
      responseType: 'text'  // Add this line
    });
  }

  

  isAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');
    // Check if the JWT exists
    if(jwt!=null)
      this.getiduserinlocalstorage()
    return jwt != null;
  }
  // ...........................................User Managaement............................................

  getAllUsers(): Observable<any> {
    return this.http.get(API_BASE_URL + 'users/allUsers', {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  // Adjust the setUserAccepted method to expect a text response
  setUserAccepted(id: number): Observable<any> {
    return this.http.put(`${API_BASE_URL}users/${id}/accepted`, null, {
      responseType: 'text' // Specify the expected response type as text
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  setUserRejected(id: number): Observable<any> {
    return this.http.put(`${API_BASE_URL}users/${id}/rejected`, null, {
      responseType: 'text' // Specify the expected response type as text
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }


  setUserPending(id: number): Observable<any> {
    return this.http.put(`${API_BASE_URL}users/${id}/pending`, null, {
      responseType: 'text'  // Specify the expected response type as text if the backend does not return JSON
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(() => error); // Proper way to rethrow error in newer RxJS versions
      })
    );
  }


  updateUserProfile(userId: number, userData: any): Observable<any> {
    return this.http.put(API_BASE_URL + 'users/' + userId + '/updateProfile', userData, {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating user profile:', error.error);
        return throwError(() => new Error(error.error || 'Unknown error'));
      })
    );
  }

  getUsersByRoleAndEtat(role: string, etat: string): Observable<any> {
    return this.http.get(API_BASE_URL + 'users/usersByRoleAndEtat/' + role + '/' + etat, {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }


    // .........................................Authorization............................................

  public createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getemail(): string | null {
    const token = this.getToken();
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.sub;
  }


  getiduserinlocalstorage() {

    let email = this.getemail();
    this.userService.getUserbyemail(email).subscribe(
      (res) => {
        console.log(res);
        console.log(res.id);
        localStorage.setItem('idUser', res.id.toString());
        //alert(localStorage.getItem('idUser'));
        //alert(res.role);
        localStorage.setItem('Role', res.role);
        if (localStorage.getItem('Role') == "ADMIN") {
          if (!localStorage.getItem('reloaded')) {
            // Set the 'reloaded' flag in the local storage
            localStorage.setItem('reloaded', 'true');
            location.reload();
          } else {
            // Remove the 'reloaded' flag from the local storage
            localStorage.removeItem('reloaded');
          }
        }
        this.clubService.getClubByUserAndPresident(res.id).subscribe(
          (res) => {
            console.log(res);
            console.log(res.id);
            localStorage.setItem('idClub', res.id.toString());
            if (!localStorage.getItem('reloaded')) {
              // Set the 'reloaded' flag in the local storage
              localStorage.setItem('reloaded', 'true');
              location.reload();
            } else {
              // Remove the 'reloaded' flag from the local storage
              localStorage.removeItem('reloaded');
            }
            // alert(localStorage.getItem('idClub'));
          }
        )

      }
    )
  }

  isTokenExpired(token: string | null): boolean {
  if (!token) {
    return true;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp; // Expiration time of the token, UNIX timestamp
  const now = new Date().getTime() / 1000; // Current time in UNIX timestamp
  return exp < now;
}

  
getUserRole(): Observable<string> {
  const jwtToken = localStorage.getItem('jwt');
  if (jwtToken) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
    return this.http.get(BASE_URL + 'api/user-role', { headers, responseType: 'text' });
  } else {
    return new Observable<string>(observer => {
      observer.error('JWT token not found in local storage');
    });
  }
}
getCurrentUser(): Observable<string> {
  const jwtToken = localStorage.getItem('jwt');
  if (jwtToken) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
    return this.http.get(BASE_URL + 'api/current-user', { headers, responseType: 'text' });
  } else {
    return new Observable<string>(observer => {
      observer.error('JWT token not found in local storage');
    });
  }
}



}
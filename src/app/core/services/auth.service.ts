import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, switchMap } from 'rxjs';

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: User | null = null;
  private jsonUrl = 'http://localhost:3000/users'; // JSON server URL

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(newUser: User): Observable<any> {
    return this.userExists(newUser.email).pipe(
      switchMap((exists: boolean) => {
        if (exists) {
          // Return an error message if the user already exists
          return of({ error: 'User already exists' });
        } else {
          // Proceed with registration if user does not exist
          return this.http.post(this.jsonUrl, newUser).pipe(
            catchError(this.handleError('registerUser', []))
          );
        }
      })
    );
  }

   // Modify the loginUser method to set the loggedInUser
   loginUser(credentials: { email: string; password: string }): Observable<User | null> {
    return this.http.get<User[]>(this.jsonUrl).pipe(
      map(users => {
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user)); // Store the user in local storage
          return user; // Return user if found
        }
        return null; // Return null if not found
      }),
      catchError(this.handleError('loginUser', null))
    );
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser'); // Clear user from local storage on logout
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser'); // Check if there is a user in local storage
  }

  // Check if the user exists by email
  private userExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(this.jsonUrl).pipe(
      map(users => users.some(user => user.email === email)),
      catchError(this.handleError('userExists', false))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console
      return of(result); // Let the app keep running by returning an empty result.
    };
  }
}

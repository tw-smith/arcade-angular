import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { SignupFormEntry, LoginFormEntry, HighScoreFormEntry } from "./forms";
import { environment} from "../env/env.prod";


@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor(private http: HttpClient) { }

  private signupUrl: string = `${environment.arcadeBackendUrl}/auth/signup`
  private loginUrl: string = `${environment.arcadeBackendUrl}/auth/login`
  private highScoreUrl: string = `${environment.arcadeBackendUrl}/highscores`
  private lobbyUrl: string = `${environment.arcadeBackendUrl}/lobbies`

  private httpOptions = {
    headers: new HttpHeaders({
    })
  }

  submitSignupForm(formData: SignupFormEntry): Observable<any> {
    const data: FormData = new FormData();
    data.append('email', formData.email)
    data.append('username', formData.username)
    data.append('password', formData.password)
    this.httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.signupUrl, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  submitLoginForm(formData: LoginFormEntry): Observable<any> {
    const data: FormData = new FormData();
    data.append('username', formData.username)
    data.append('password', formData.password)
    this.httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.loginUrl, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  highScoreSubmitForm(formData: HighScoreFormEntry): Observable<any> {
    const requestBody = {
      'score_type': formData.score_type,
      'value': formData.value
    }
    this.httpOptions.headers.append('Content-Type', 'application/json')
    return this.http.post(this.highScoreUrl, requestBody, this.httpOptions)
      .pipe(
    catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      // a client side or network error
      console.log('An error occurred:', error.error)
    } else {
      // Backend returned an error code
      console.error(`Backend returned error code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong! Please try again.'))
  }

}

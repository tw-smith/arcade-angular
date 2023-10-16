import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  setSession(token: string) {
    sessionStorage.setItem('access_token', token)
  }

  logout() {
    sessionStorage.removeItem('access_token')
  }


  getTokenExpiry() {

  }



}

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

  getSession(): Boolean {
    const access_token = sessionStorage.getItem('access_token')
    if (access_token) {
      return true
    } else {
      return false
    }
  }

  logout() {
    sessionStorage.removeItem('access_token')
  }


  getTokenExpiry() {

  }



}

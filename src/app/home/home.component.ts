import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AuthService} from "../auth.service";
import { OnInit } from "@angular/core";


// import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  loggedIn: Boolean = false

  ngOnInit() {
    this.loggedIn = this.authService.getSession()
  }

  logout() {
    this.authService.logout()
    this.ngOnInit()
  }


}


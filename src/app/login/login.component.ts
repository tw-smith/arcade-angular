import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoginFormEntry } from "../forms";
import { FormSubmitService } from "../form-submit.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private formSubmitService: FormSubmitService,
    private authService: AuthService,
    private router: Router
  ) {}


  model = new LoginFormEntry('','')
  errorMsg: string = ''

  onSubmit(form: NgForm): void {
        this.formSubmitService.submitLoginForm(form.value).subscribe(
          resp => {
            this.authService.setSession(resp.access_token)
            this.router.navigateByUrl(`/lobbies`)
          },
          error => this.errorMsg = error.message
        )
  }
}





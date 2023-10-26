import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ForgottenPasswordFormEntry } from "../forms";
import { FormSubmitService } from "../form-submit.service";

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {
  constructor(
    private formSubmitService: FormSubmitService
  ) {}

  model = new ForgottenPasswordFormEntry('')
  serverMsg: string = ''


  onSubmit(form: NgForm): void {
    this.formSubmitService.submitForgottenPasswordForm(form.value).subscribe(
      resp => this.serverMsg = resp.detail,
      error => this.serverMsg = error.message
    )
  }


}

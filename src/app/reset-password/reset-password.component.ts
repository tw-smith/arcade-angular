import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ResetPasswordFormEntry } from "../forms";
import { FormSubmitService } from "../form-submit.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(
    private formSubmitService: FormSubmitService
  ) {}

  model = new ResetPasswordFormEntry('','')
  serverMsg: string = ''



}

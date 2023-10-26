import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SignupFormEntry } from "../forms";
import { FormSubmitService } from "../form-submit.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor (
    private formSubmitService: FormSubmitService
  ) {}

  model = new SignupFormEntry('','','', '')
  errorMsg: string = ''



  onSubmit(form: NgForm): void {
    this.formSubmitService.submitSignupForm(form.value).subscribe(
      resp => console.log(resp),
      error => this.errorMsg = error.message,
    )
  }


}

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
  serverMsg: string = ''



  onSubmit(form: NgForm): void {
    this.formSubmitService.submitSignupForm(form.value).subscribe(
      (resp) => {
        console.log(resp)
        if (resp.msg == "User Created") {
          console.log('in 201 branch')
          this.serverMsg = 'Signed up! Check your email for a verification link.'
        }
      },
      error => this.serverMsg = error.message,
    )
  }


}

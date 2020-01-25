import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ]
    });
    // tslint:disable-next-line: deprecation
    this.clearFormFields();
  }

  getErrorMessage() {
    return this.loginForm.get('email').hasError('required')
      ? 'You must enter a value'
      : this.loginForm.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onEmailLogin() {
    this.loginService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {
          if (this.loginForm.value.email === 'stas.alex28@gmail.com') {
            this.router.navigateByUrl('/user');
          }
          if (this.loginForm.value.email === 'admin@admin.com') {
            this.router.navigateByUrl('/admin');
          }
          // console.log(this.loginForm.value);
        },
        ({ message }) => {
          alert(message);
        }
      );
  }
  clearFormFields() {
    this.loginForm.reset();
  }
}

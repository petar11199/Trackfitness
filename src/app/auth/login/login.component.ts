import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  error: string;
  isLoading: boolean;
  denied: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.authService.currentState.subscribe(state => this.denied = state);
  }

  login(formValue: HTMLFormElement) {
    this.isLoading = true;
    this.authService.loginWithEmail(formValue.email, formValue.password)
      .then(() => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.isLoading = false;
      })
  }

}

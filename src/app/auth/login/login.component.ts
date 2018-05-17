import { AuthService } from './../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLoading: boolean;
  signinForm: FormGroup;
  error: string;

  constructor(
    private db: AngularFireDatabase, 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login(formValue) {
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

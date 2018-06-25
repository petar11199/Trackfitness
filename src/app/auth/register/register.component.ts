import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: string;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
      awards: [{ firstTimeLogin: true }],
      notifications: [[{
        title: 'New version now available!',
        description: 'Click here to read release notes',
        link: 'https://github.com/petar11199/trackfitness'
      }]]
    })
  }

  register(formValue: HTMLFormElement) {
    if (formValue.password === formValue.passwordRepeat) {
      this.authService.signUpWithEmail(formValue.email, formValue.password)
        .then(() => {
          this.afAuth.authState.subscribe(user => {
            if (user) {
              this.userId = user.uid;
              this.db.object(`users/${this.userId}`).set(formValue);
            }
          })
          this.router.navigate(['/login']);
        })
        .catch((err) => this.error = err.message)
    }
    else {
      this.error = "Passwords don't match";
    }
  }
}

import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

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
      awards: [{firstTimeLogin: true}]
    })
  }

  register(formValue) {
    if (formValue.password === formValue.passwordRepeat) {
      this.authService.signUpWithEmail(formValue.email, formValue.password)
        .then(() => {
          this.afAuth.authState.subscribe(user => {
            if(user) {
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

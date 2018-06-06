import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  successful: boolean;
  userId: string;
  user: Observable<any[]>;
  personalInfo: FormGroup;
  isLoading;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.isLoading = true;

    this.personalInfo = this.fb.group({
      name: [''],
      age: [''],
      email: [{value: null, disabled: true}],
      bio: [''],
      height: [''],
      weight: ['']
    })

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid;
    })

    this.db.object(`/users`).valueChanges().subscribe(
      res => {
        this.user = res[this.userId];
        this.personalInfo.patchValue(this.user);
        this.isLoading = false;
      })
  }

  updateUser(formValue) {
    this.db.object('/users/' + this.userId)
      .update(formValue)
      .then(() => {
        this.personalInfo.markAsPristine();
        this.successful = true;
        setTimeout(() => {
          this.successful = false
        }, 2000);
      })
  }
}

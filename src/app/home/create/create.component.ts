import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './../home.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  mealsPage: boolean;
  isLoading: boolean;
  timeValue: number;
  exerciseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.exerciseForm = this.fb.group({
      name: ['', [Validators.required]],
      shortDesc: ['', [Validators.required]],
      longDesc: [''],
      time: ['', [Validators.required]]
    })

    if (this.router.url === '/home/meals/create') {
      this.mealsPage = true;
    }
  }

  addNewExercise(formValue) {
    this.isLoading = true;
    let userId = this.authService.currentUserId();

    if (this.mealsPage) {
      this.homeService.addNew(userId, formValue, 'meals')
        .then(() => {
          this.router.navigate(['/home/meals']);
        })
    } else {
      this.homeService.addNew(userId, formValue, 'exercises')
        .then(() => {
          this.router.navigate(['/home/exercises'])
        })
    }
  }

}

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
export class CreateComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  timeValue: number;
  exerciseForm: FormGroup;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder, 
    private homeService: HomeService,
    private router: Router) {}

  ngOnInit() {
    this.exerciseForm = this.fb.group({
      name: ['', [Validators.required]],
      shortDesc: ['', [Validators.required]],
      longDesc: ['', [Validators.required]],
      time: ['', [Validators.required]]
    })
  }

  addNewExercise(formValue) {
    this.isLoading = true;
    let userId: string;
    this.subscription = this.homeService.getUserId().subscribe(res => {
      userId = res;
      this.homeService.addNewExercise(userId, formValue)
        .then(() => {
          this.router.navigate(['/home/exercises'])
        })
    })
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  userId: string;
  exercises: any[] = [];
  subscription: Subscription;

  numbOfFinished: any;
  numOfMinutes: number;
  deletedItem: any;
  isDeleted: boolean;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.subscription = this.homeService.getUserId().subscribe(res => {
      this.userId = res;
      this.homeService.getExercisesList(this.userId).subscribe(res => {
        this.exercises = Object.values(res);
        this.numOfMinutes = 0;   // reseting sum
        this.numbOfFinished = 0; // reseting sum
        this.exercises.forEach(element => {
          this.numOfMinutes += element.time;
          if(element.finished) {
            this.numbOfFinished += element.finished;
          }
        })
      });
    });
  }

  deleteExcersise(key, index) {
    if(this.deletedItem === index) {
      this.deletedItem = null;
    } else {
      this.deletedItem = index;
    }
    this.isDeleted = true;
    setTimeout(() => {
      this.homeService.deleteExercise(this.userId, key);
    }, 1000);
  }

  finishExcersise(key) {
    this.homeService.finishExercise(this.userId, key);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

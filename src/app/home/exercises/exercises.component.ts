import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  deletedItem: any;
  isDeleted: boolean;
  numOfMinutes: any[] = [];
  exercises: any[] = [];
  userId: string;

  subscription: Subscription;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    let temp = [];

    this.subscription = this.homeService.getUserId().subscribe(res => {
      this.userId = res;
      this.homeService.getExercisesList(this.userId).subscribe(res => {
        console.log(res)
        this.exercises = Object.values(res);
        this.exercises.forEach(element => {
          temp.push(element.time);
          this.numOfMinutes = temp.reduce((acc, val) => { return acc + val });
        });
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

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  awarded: boolean;
  awardName: string;
  firstAward: boolean;
  isLoading: boolean;
  userId: string;
  exercises: any[] = [];
  subscription: Subscription;

  numbOfFinished: any;
  numOfMinutes: number;
  deletedItem: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.homeService.getUserId().subscribe(res => {
      this.userId = res;
      this.homeService.getExercisesList(this.userId).subscribe(res => {
        this.exercises = Object.values(res);
        this.numOfMinutes = 0;   // reseting sum
        this.numbOfFinished = 0; // reseting sum
        this.exercises.forEach(element => {
          this.numOfMinutes += element.time;
          if (element.finished) {
            this.numbOfFinished += element.finished;
          }
        })
      });
      this.isLoading = false;
    });

  }

  deleteExcersise(key, index) {
    if (this.deletedItem === index) {
      this.deletedItem = null;
    } else {
      this.deletedItem = index;
    }
    setTimeout(() => {
      this.homeService.deleteExercise(this.userId, key);
    }, 1000);
  }

  finishExcersise(key) {
    this.homeService.finishExercise(this.userId, key);
    this.homeService.getAwards(this.userId).subscribe(res => {
      let awardName;
      if (this.numbOfFinished === 1) {
        if (res.find(award => (award.key === "firstExercise"))) {
        } else {
          awardName = 'firstExercise'
          this.homeService.addAward(this.userId, awardName).then(() => {
            this.awardName = 'firstExercise';
            this.awarded = true;
          });
        }
      }

      if (this.numbOfFinished === 5) {
        if (res.find(award => (award.key === "fifthExercise"))) {
        } else {

          awardName = 'fifthExercise'
          this.homeService.addAward(this.userId, awardName).then(() => {
            this.awardName = 'fifthExercise';
            this.awarded = true;
          });
        }
      }

      if (this.numbOfFinished === 3) {
        this.awardName = 'test';
        this.awarded = true;
      }
    })

  }


  receivedMessage($event) {
    this.awarded = $event;
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

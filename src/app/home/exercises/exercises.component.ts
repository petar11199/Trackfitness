import { AuthService } from './../../auth/auth.service';
import { AwardService } from './../../awards/award.service';
import { Component, OnInit, OnDestroy, Testability } from '@angular/core';
import { HomeService } from './../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  exercises: any[] = [];
  userId: string;
  isLoading: boolean;

  awarded: boolean;
  awardDesc: string;
  awardName: string;

  numbOfFinished: number;
  numOfMinutes: number;
  deletedItem: any;

  constructor(
    private homeService: HomeService,
    private awardService: AwardService,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.currentUserId();

    this.subscription = this.homeService.getList(this.userId, 'exercises').subscribe(res => {
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
  }
  deleteExcersise(key, index) {
    if (this.deletedItem === index) {
      this.deletedItem = null;
    } else {
      this.deletedItem = index;
    }
    setTimeout(() => {
      this.homeService.delete(this.userId, key, 'exercises');
    }, 1000);
  }

  finishExcersise(key) {
    let awards = this.awardService.getAllAwards();

    this.homeService.finish(this.userId, key, 'exercises');
    this.subscription = this.awardService.getAwards(this.userId).subscribe(res => {
      awards.forEach(award => {
        if (this.numbOfFinished === award.finished) {
          if (res.find(r => (r.key === award.awardName))) { }
          else {
            this.awardService.addAward(this.userId, award.awardName).then(() => {
              award.awarded = true;
              this.awardName = award.awardName;
              this.awardDesc = award.description;
              this.awarded = true;
            })
          }
        }
      });
    });
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

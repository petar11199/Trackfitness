import { AwardService } from './../../awards/award.service';
import { Component, OnInit, OnDestroy, Testability } from '@angular/core';
import { HomeService } from './../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  meals: any[] = [];
  userId: string;
  isLoading: boolean;

  awarded: boolean;
  awardDesc: string;
  awardName: string;

  sumOfEatenCals: number = 0;
  numbOfFinished: number;
  numOfCals: number;
  deletedItem: any;

  constructor(
    private homeService: HomeService,
    private awardService: AwardService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.homeService.getUserId().subscribe(res => {
      this.userId = res;
      this.homeService.getList(this.userId, 'meals').subscribe(res => {
        this.meals = Object.values(res);
        this.numOfCals = 0;   // reseting sum
        this.numbOfFinished = 0; // reseting sum
        this.meals.forEach(element => {
          this.numOfCals += element.time;
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
      this.homeService.delete(this.userId, key, 'meals');
    }, 1000);
  }

  finishExcersise(key) {
    let awards = this.awardService.getAllAwards();
    this.homeService.finish(this.userId, key, 'meals')
      .then(() => {
        this.meals.forEach(element => {
          if (element.finished) {
            this.sumOfEatenCals += element.time;
          }
        });

        this.subscription = this.awardService.getAwards(this.userId).subscribe(res => {
          awards.forEach(award => {
            if (this.numbOfFinished === award.finishedMeal) {
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

            if (this.sumOfEatenCals >= award.finishedMeal) {
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

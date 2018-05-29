import { HomeService } from './../../home/home.service';
import { AwardService } from './../award.service';
import { Component, OnInit } from '@angular/core';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';

@Component({
  selector: 'app-awards-list',
  templateUrl: './awards-list.component.html',
  styleUrls: ['./awards-list.component.css']
})
export class AwardsListComponent implements OnInit {

  activeFilter: any;
  awards: any = [];
  awardsTemp;

  constructor(
    private awardsService: AwardService,
    private homeService: HomeService) { }

  ngOnInit() {
    this.activeFilter = 1; // set first filter to be selected

    let userId;
    this.awards = this.awardsService.getAllAwards();
    this.homeService.getUserId().subscribe(res => {
      userId = res;
      this.awardsService.getAwards(userId).subscribe(res => {
        this.awardsTemp = this.awards;
        res.forEach(res => {
          this.awardsTemp = this.awardsTemp.map(award1 => {
            if (res.key === award1.awardName) {
              award1.awarded = true;
            }
            return award1;
          })
        });
      });
    });
  }

  filter(i: number) {
    this.activeFilter = i;
    if (i === 1) {
      this.awards = this.awardsTemp;
    }
    else if (i === 2) {
      this.awards = [];
      this.awardsTemp.forEach(element => {
        if(element.awarded === true) {
          this.awards.push(element);
        }
      });
    }
    else if (i === 3) {
      this.awards = [];
      this.awardsTemp.forEach(element => {
        if(element.finished >= 1  && element.awarded === false || 
          element.finishedMeal >= 1  && element.awarded === false ) {
          this.awards.push(element);
        }
      });
    }
    else if (i === 4) {
      this.awards = [];
      this.awardsTemp.forEach(element => {
        if(element.finished === null) {
          this.awards.push(element);
        }
      });
    }
  }

}

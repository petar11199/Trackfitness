import { HomeService } from './../../home/home.service';
import { AwardService } from './../award.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-awards-list',
  templateUrl: './awards-list.component.html',
  styleUrls: ['./awards-list.component.css']
})
export class AwardsListComponent implements OnInit {

  test: any = [];
  awards: any = [];

  constructor(
    private awardsService: AwardService,
    private homeService: HomeService) { }

  ngOnInit() {
    let userId;
    this.awards = this.awardsService.getAllAwards();
    this.homeService.getUserId().subscribe(res => {
      userId = res;
      this.awardsService.getAwards(userId).subscribe(res => {
        let array1 = this.awards;
        const array2 = res;

        array2.forEach(award2=>{
          array1 = array1.map(award1=>{
            if(award2.key === award1.awardName){
              award1.awarded = true;
            }
            return award1;
          })
        });
        
        console.log(array1);
      });
    });
  }

}

import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { HomeService } from './../home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-goals',
  templateUrl: './home-goals.component.html',
  styleUrls: ['./home-goals.component.css']
})
export class HomeGoalsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isLoading: boolean;
  meals: any[];
  exercises: any[];
  boxes = ['exercises', 'meals'];

  constructor(private homeService: HomeService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    let userId = this.authService.currentUserId();
    this.boxes.forEach(element => {
      this.subscription = this.homeService.getList(userId, element).subscribe(res => {
        if (element === 'exercises') {
          this.exercises = Object.values(res);
        }
        else if (element === 'meals') {
          this.meals = Object.values(res);
        }
      });
    });
    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

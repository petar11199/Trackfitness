import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  removeWelcome: boolean;
  userId: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.currentUserId();
    if (localStorage.getItem('welcomeMsg') === this.userId) {
      this.removeWelcome = true;
    }
  }

  removeSign() {
    localStorage.setItem('welcomeMsg', this.userId);
    if (localStorage.getItem('welcomeMsg') === this.userId) {
      this.removeWelcome = true;
    }
  }

}

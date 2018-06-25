import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() awardName: string;
  @Input() awardDesc: string;

  notifications: any;
  userId: string;
  removeNotif: boolean;
  openNotif: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    let burger = document.querySelector(".burger");
    let overlay = document.querySelector(".overlay");
    let nav = document.querySelector("nav");

    burger.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("clicked");
      burger.classList.toggle("clicked");
      overlay.classList.toggle("show");
      nav.classList.toggle("show");
    });

    this.userId = this.authService.currentUserId();

    setTimeout(() => {
      if (localStorage.getItem('opened') === this.userId) {
        this.removeNotif = true;
      }

      this.db.list(`users/${this.userId}/notifications`).valueChanges().subscribe(res => {
        this.notifications = res;
      })
    }, 1000);
  }

  removeIcon() {
    localStorage.setItem('opened', this.userId);
    this.removeNotif = true;
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

}

import { AuthService } from './../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userId: string;
  user;
  isLoading: boolean;
  onlyName: string;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.currentUserId();

    this.db.object(`/users`).valueChanges().subscribe(
      res => {
        this.user = res[this.userId];
        let name = res[this.userId].name.split(" ");
        this.onlyName = name[0];
        this.isLoading = false;
      })
  }

}

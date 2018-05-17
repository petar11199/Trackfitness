import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
    private authService: AuthService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid;
      console.log(this.userId)
    })

    this.db.object(`/users`).valueChanges().subscribe(
      res => {
        this.user = res[this.userId];
        let name = res[this.userId].name.split(" ");
        this.onlyName = name[0];
        this.isLoading = false;
      })
  }

}

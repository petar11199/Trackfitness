import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      if (auth) {
        this.router.navigate(['/home/dashboard']);
      }
      else {
        this.router.navigate(['/login']);
      }
    });
  }

  currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        throw error
      });
  }

  private stateSource = new BehaviorSubject(false);
  currentState = this.stateSource.asObservable();

  denied(state: boolean) {
    this.stateSource.next(state)
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}


import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class HomeService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) { }

  getUserId() {
    return this.afAuth.authState.map(user => {
      if(user) {
        return user.uid;
      }
    });
  }

  getExercisesList(userId) {
    return this.db.list(`users/${userId}/exercises`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addNewExercise(userId, formValue) {
    return this.db.list(`users/${userId}/exercises`).push(formValue);
  }

  deleteExercise(userId, key) {
    return this.db.list(`users/${userId}/exercises`).remove(key);
  }

  finishExercise(userId, key) {
    return this.db.object(`users/${userId}/exercises/${key}`).update({finished: Number(1)});
  }

  getAwards(userId) {
    return this.db.list(`users/${userId}/awards`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  addAward(userId, award) {
    var obj = {};
    obj[award] = true;
    return this.db.object(`users/${userId}/awards`).update(obj);
  }

}

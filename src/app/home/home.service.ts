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

  getList(userId, type) {
    return this.db.list(`users/${userId}/${type}`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addNew(userId, formValue, type) {
    return this.db.list(`users/${userId}/${type}`).push(formValue);
  }

  delete(userId, key, type) {
    return this.db.list(`users/${userId}/${type}`).remove(key);
  }

  finish(userId, key, type) {
    return this.db.object(`users/${userId}/${type}/${key}`).update({finished: Number(1)});
  }

}

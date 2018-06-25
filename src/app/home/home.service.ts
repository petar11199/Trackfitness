import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class HomeService {

  constructor(
    private db: AngularFireDatabase) { }


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
    return this.db.object(`users/${userId}/${type}/${key}`).update({ finished: Number(1) });
  }

}

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class AwardService {

  private awards: any;

  constructor(private db: AngularFireDatabase) { 
    this.awards = [
      {
        finished: 1,
        awardName: 'The beginning',
        description: 'Complete one excersise'
      },
      {
        finished: 5,
        awardName: 'Five of a kind',
        description: 'Complete five excersises'
      },
    ]
  }

  public getAllAwards(): any {
    return this.awards;
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

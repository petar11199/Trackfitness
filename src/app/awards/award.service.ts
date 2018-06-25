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
        description: 'Complete one excercise',
        difficulty: 'easy',
        awarded: false
      },
      {
        finished: 5,
        awardName: 'Five of a kind',
        description: 'Complete five excercises',
        difficulty: 'medium',
        awarded: false
      },
      {
        finished: null,
        awardName: 'The runner',
        description: 'Run for 20 miles',
        difficulty: 'hard',
        awarded: false
      },
      {
        finished: null,
        awardName: 'Jack in a box',
        description: 'Open this page 5 days in a row',
        difficulty: 'easy',
        awarded: false
      },
      {
        finished: null,
        awardName: 'Party man',
        description: 'Invite two friends',
        difficulty: 'medium',
        awarded: false
      },
      {
        finishedMeal: 1000,
        awardName: 'Hungry',
        description: 'Eat 1000 calories',
        difficulty: 'easy',
        awarded: false
      },
      {
        finishedMeal: 1,
        awardName: 'First bite',
        description: 'Eat your first meal',
        difficulty: 'easy',
        awarded: false
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

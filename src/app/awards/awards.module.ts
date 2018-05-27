import { HomeService } from './../home/home.service';
import { AwardService } from './award.service';
import { SharedModule } from './../shared/shared.module';
import { awardsRouting } from './awards.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwardsComponent } from './awards.component';
import { AwardsListComponent } from './awards-list/awards-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    awardsRouting
  ],
  declarations: [
    AwardsComponent,
    AwardsListComponent
  ],
  providers: [
    AwardService,
    HomeService
  ]
})
export class AwardsModule { }

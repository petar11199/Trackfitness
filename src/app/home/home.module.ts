
import { homeRouting } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeGoalsComponent } from './home-goals/home-goals.component';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeGoalsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    homeRouting
  ],
  providers: [],
})
export class HomeModule { }
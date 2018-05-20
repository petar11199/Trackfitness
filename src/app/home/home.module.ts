import { HomeService } from './home.service';

import { homeRouting } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeGoalsComponent } from './home-goals/home-goals.component';
import { HomeComponent } from './home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    HomeGoalsComponent,
    ExercisesComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    homeRouting
  ],
  providers: [
    HomeService
  ],
})
export class HomeModule { }
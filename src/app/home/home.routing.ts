import { ExercisesComponent } from './exercises/exercises.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeGoalsComponent } from './home-goals/home-goals.component';
import { CreateComponent } from './create/create.component';


const homeRoutes: Routes = [
  { 
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeGoalsComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'create', component: CreateComponent }
  ]},
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
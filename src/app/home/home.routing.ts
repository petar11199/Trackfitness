import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeGoalsComponent } from './home-goals/home-goals.component';
import { CreateComponent } from './create/create.component';
import { MealsComponent } from './meals/meals.component';
import { ExercisesComponent } from './exercises/exercises.component';


const homeRoutes: Routes = [
  { 
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeGoalsComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercises/create', component: CreateComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'meals/create', component: CreateComponent }
  ]},
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
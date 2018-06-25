import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeGoalsComponent } from './home-goals/home-goals.component';
import { CreateComponent } from './create/create.component';
import { MealsComponent } from './meals/meals.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AuthGuard } from '../auth/auth.guard';


const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeGoalsComponent, canActivate: [AuthGuard] },
      { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard] },
      { path: 'exercises/create', component: CreateComponent, canActivate: [AuthGuard] },
      { path: 'meals', component: MealsComponent, canActivate: [AuthGuard] },
      { path: 'meals/create', component: CreateComponent, canActivate: [AuthGuard] }
    ]
  },
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
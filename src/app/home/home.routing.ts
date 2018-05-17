import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeGoalsComponent } from './home-goals/home-goals.component';


const homeRoutes: Routes = [
  { 
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeGoalsComponent },
      { path: 'home/goals', component: HomeGoalsComponent }
  ]},
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
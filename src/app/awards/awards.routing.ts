import { AwardsListComponent } from './awards-list/awards-list.component';
import { AwardsComponent } from './awards.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const awardsRoutes: Routes = [
  { 
    path: '', component: AwardsComponent, children: [
      { path: '', redirectTo: 'awards', pathMatch: 'full' },
      { path: 'awards', component: AwardsListComponent, canActivate: [AuthGuard] }
  ]},
];

export const awardsRouting: ModuleWithProviders = RouterModule.forChild(awardsRoutes);
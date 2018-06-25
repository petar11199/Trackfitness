import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimePipe } from './pipes/time.pipe';
import { AwardPopupComponent } from './award-popup/award-popup.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    TimePipe,
    AwardPopupComponent,
    WelcomeComponent
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    AwardPopupComponent,
    WelcomeComponent,
    TimePipe
  ],
  providers: [
    TimePipe
  ]
})
export class SharedModule { }
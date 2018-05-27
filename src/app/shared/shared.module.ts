import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { TimePipe } from './pipes/time.pipe';
import { AwardPopupComponent } from './award-popup/award-popup.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    LoaderComponent,
    TimePipe,
    AwardPopupComponent
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    AwardPopupComponent,
    TimePipe
  ],
  providers: [
    TimePipe
  ]
})
export class SharedModule { }
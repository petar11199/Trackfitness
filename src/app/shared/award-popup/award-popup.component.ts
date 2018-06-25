import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-award-popup',
  templateUrl: './award-popup.component.html',
  styleUrls: ['./award-popup.component.css']
})
export class AwardPopupComponent {

  @Output() awardedClosed = new EventEmitter<boolean>();
  @Input() awarded: boolean;
  @Input() awardName: string;
  @Input() awardDesc: string;

  closeWindow() {
    this.awarded = false;
    this.awardedClosed.emit(this.awarded);
  }

}

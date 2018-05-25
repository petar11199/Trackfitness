import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-award-popup',
  templateUrl: './award-popup.component.html',
  styleUrls: ['./award-popup.component.css']
})
export class AwardPopupComponent implements OnInit {

  @Input() awarded: boolean;
  @Input() awardName: string;
  @Output() awardedClosed = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  closeWindow() {
    this.awarded = false;
    this.awardedClosed.emit(this.awarded);
  }

}

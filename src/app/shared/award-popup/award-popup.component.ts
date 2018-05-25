import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-award-popup',
  templateUrl: './award-popup.component.html',
  styleUrls: ['./award-popup.component.css']
})
export class AwardPopupComponent implements OnInit {

  @Output() awardedClosed = new EventEmitter<boolean>();
  @Input() awarded: boolean;
  @Input() awardName: string;
  @Input() awardDesc: string;

  constructor() { }

  ngOnInit() {}
  
  closeWindow() {
    this.awarded = false;
    this.awardedClosed.emit(this.awarded);
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss'],
})
export class EmojiComponent implements OnInit {
  constructor() {}
  @Output() dataEmitted = new EventEmitter<string>();
  ngOnInit(): void {}

  toggled: boolean = false;
  messageicon: string = '';

  handleSelection(event) {
    this.messageicon = event.char;
    this.dataEmitted.emit(this.messageicon);
  }
}

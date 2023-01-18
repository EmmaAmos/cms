import { Component, Input } from '@angular/core';
import { Messages } from '../messages.model';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent {

  @Input() message!: Messages;

  constructor() {}

}

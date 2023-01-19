import { Component } from '@angular/core';

import { Messages } from '../messages.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent {
  message: Messages[] =[
    new Messages('2345', 'Hi', 'Do you want to meet up?', 'Emma A' ),
    new Messages('2346', 'Test Tomarrow', 'Hey, we have a test tomarrow, want to study?', 'David O.' )
  ];

  onMessageAdded(message: Messages) {
    this.message.push(message);
  }
}

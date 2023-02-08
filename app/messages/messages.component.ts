import { Component, OnInit } from '@angular/core';
import { MessagesServiceService } from './messages-service.service';

import { Messages } from './messages.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  message: Messages[] =[];
/*
  constructor(private messageService: MessagesServiceService) {

  }

  ngOnInit() {
      this.message = this.messageService.getMessages();
      this.messageService.messageChanged
        .subscribe((
          message: Messages[]) => {
            this.message = message;
          }
        );
  }
  */
}

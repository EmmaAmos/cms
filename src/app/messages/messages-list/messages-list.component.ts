import { Component, OnInit } from '@angular/core';
import { MessagesServiceService } from '../messages-service.service';

import { Messages } from '../messages.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit{
  message: Messages[] =[];


  constructor(private messageService: MessagesServiceService) {

  }

  ngOnInit() {
      this.message = this.messageService.getMessages();
      this.messageService.messageChanged
        .subscribe((
          message: Messages[]) => {
            this.message = message;
            console.log(this.message)
          }
        );
  }
}
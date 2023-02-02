import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact-list/contact-list.model';
import { Messages } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesServiceService {
  messageChanged = new EventEmitter<Messages[]>();

  
  private messages: Messages[] =[
    new Messages('2345', 'Hi', 'Do you want to meet up?', 'Emma A' ),
    new Messages('2346', 'Test Tomarrow', 'Hey, we have a test tomarrow, want to study?', 'David O.' )
  ]

  getMessages(): Messages[]{
    return this.messages.slice();
  }

  getMessage(id: string) : Messages {
    for (const message of this.messages) {
      if(message.id == id) {
         return message;
      }
    }
    return null!;
  }

  addMessage(messages: Messages) {
    this.messages.push(messages);
    this.messageChanged.emit(this.messages.slice());
    console.log('Message-service-addMessage is working');
  }


  constructor(){
    this.messages = MOCKMESSAGES;
  }
}

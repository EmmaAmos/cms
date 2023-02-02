import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessagesServiceService } from '../../messages-service.service';
import { Messages } from '../../messages.model';



@Component({
  selector: 'app-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent {

  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('messageInput') messageInputRef!: ElementRef;
  @ViewChild('senderInput') senderInputRef!: ElementRef;

  constructor(private messageServices: MessagesServiceService) {

  }

  onSendMessage(message: Messages){
    this.messageServices.addMessage(message)
  }

  onAddItem() {
    const ingID = this.idInputRef.nativeElement.value;
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMessage = this.messageInputRef.nativeElement.value;
    const ingSender = this.senderInputRef.nativeElement.value;

    const newMessage = new Messages(ingID, ingSubject, ingMessage, ingSender);
    this.messageServices.addMessage(newMessage);
    console.log('Message-edit is working')
  }
}
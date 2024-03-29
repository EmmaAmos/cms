import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Messages } from '../messages.model';

@Component({
  selector: 'app-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent {

 constructor(private route: ActivatedRoute, private router: Router){

 }
  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('messageInput') messageInputRef!: ElementRef;
  @ViewChild('senderInput') senderInputRef!: ElementRef;
  @Output() messageAdded = new EventEmitter<Messages>();


  onAddItem($event: any) {
    const ingID = this.idInputRef.nativeElement.value;
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMessage = this.messageInputRef.nativeElement.value;
    const ingSender = this.senderInputRef.nativeElement.value;

    const newMessage = new Messages( ingID, ingSubject, ingMessage, ingSender);
    this.messageAdded.emit(newMessage);
  }

  onClear(){
    this.router.navigate(['/messages'], {relativeTo: this.route})
  }
}
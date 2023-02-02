import { Component, Input, OnInit } from '@angular/core';
import { ContactsServiceService } from 'src/app/contacts/contacts-service.service';
import { Messages } from '../messages.model';
import { Contact } from 'src/app/contacts/contact-list/contact-list.model';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent implements OnInit{

  @Input() message!: Messages;

  messageSender!: string;

  constructor(private contactService: ContactsServiceService) {}
  ngOnInit() {
     const contact: Contact = this.contactService.getContact(this.message.sender);
     this.messageSender = contact.name;
  }
}

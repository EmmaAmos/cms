import { Component, OnInit } from '@angular/core';

import { Contact } from './contact-list/contact-list.model';
import { ContactsServiceService } from './contacts-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsServiceService]
})
export class ContactsComponent {
  contacts!: Contact[];
  selectedContact!: Contact;

    constructor( private contactsService: ContactsServiceService) {

    }

  ngOnInit() {
    this.contactsService.contactSelected
      .subscribe((contact: Contact) =>{
        this.selectedContact = contact;
      });
  }
}

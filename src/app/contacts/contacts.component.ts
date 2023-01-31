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
  selectedContact!: Contact;

    constructor(private contactService: ContactsServiceService) {

    }

  ngOnInit() {
    this.contactService.contactSelected
      .subscribe((contacts: Contact) =>{
        this.selectedContact = contacts;
      });
  }
}

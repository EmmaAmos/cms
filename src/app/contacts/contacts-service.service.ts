import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact-list/contact-list.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {
  contactSelected = new EventEmitter<Contact>();

  contactChanged = new EventEmitter<Contact[]>();

  contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] =[
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', []),
    new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', [])
  ];

  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  getContact(id: string) : Contact {
    for (let contact of this.contacts) {
      if(contact.id == id) {
         return contact;
      }
    }
    return null!;
  }

  getSingleContact(id: number){
    return this.contacts[id];
  }

  addContact(contacts: Contact) {
    this.contacts.push(contacts);
    this.contactChanged.emit(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  constructor(){
    this.contacts = MOCKCONTACTS;
  }
  
}

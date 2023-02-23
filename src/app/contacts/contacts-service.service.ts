import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact-list/contact-list.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {

  contactChanged = new Subject<Contact[]>();

  contactChangedEvent = new Subject<Contact[]>();

  contactsListChangedEvent  = new Subject<Contact[]>();

  startedEditing = new Subject<number>();

  maxId = 0;

  maxContactId = 1;

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

  /*
  addContact(contacts: Contact) {
    this.contacts.push(contacts);
    this.contactChanged.next(this.contacts.slice());
  }
  */
  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactsListChangedEvent.next(contactsListClone);
}


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }

  /*
  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }
  */
  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
        let currentId = parseInt(contact.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
}

  constructor(){
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }
  
}

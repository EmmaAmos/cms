import { Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providers } from 'ng2-dnd';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact-list/contact-list.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {

  contactSelected = new Subject<Contact>();

  contactChanged = new Subject<Contact[]>();

  contactChangedEvent = new Subject<Contact[]>();

  contactsListChangedEvent  = new Subject<Contact[]>();

  startedEditing = new Subject<number>();

  maxContactId!: number;

  private contacts: Contact[] =[
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', []),
    new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', [])
  ];
  
  getContacts(): Observable<Contact[]>{
    //return this.contacts.slice();
    return this.http.get<Contact[]>('https://emma-sangularproject-default-rtdb.firebaseio.com/contacts.json')
      .pipe(
        tap((contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactsListChangedEvent.next(this.contacts.slice());
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
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
    //this.contactsListChangedEvent.next(contactsListClone);
    this.storeContacts(contactsListClone)
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      console.log('this is '+ originalContact)
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      console.log('this is the position of the contact' +pos)
        return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    //this.contactChangedEvent.next(contactsListClone);
    this.storeContacts(contactsListClone)
  }

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
    //this.contactChangedEvent.next(contactsListClone);
    this.storeContacts(contactsListClone)
  }

  storeContacts(contacts: Contact[]) {
    const contactString = JSON.stringify(contacts);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http
      .put('https://emma-sangularproject-default-rtdb.firebaseio.com/contacts.json', contactString, { headers })
      .subscribe(
        (response) => {
          console.log('Contact saved successfully', response);
        }, 
        (error) => {
          console.error('Error saving contacts: ', error);
        });
  
    this.contactsListChangedEvent.next(this.contacts.slice());
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
  constructor(private http: HttpClient){
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  
}

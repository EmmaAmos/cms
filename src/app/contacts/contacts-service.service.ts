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
  */
  addContact(contacts: Contact) {
    if (!contacts) {
      return;
    }

    // make sure id of the new Document is empty
    contacts.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contacts: Contact }>('http://localhost:3000/contacts',
    contacts,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contacts);
          this.sortAndSend();
        }
      );
  }

/*
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
  */
 
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }
/*
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
*/

deleteContact(contacts: Contact) {

  if (!contacts) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === contacts.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/contacts/' + contacts.id)
    .subscribe(
      (response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );
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

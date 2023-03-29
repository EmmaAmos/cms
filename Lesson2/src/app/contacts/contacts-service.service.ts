import { Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providers } from 'ng2-dnd';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Contact } from '../contacts/contacts.model';
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
    new Contact('0','1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', []),
    new Contact('1','2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', [])
  ];
  
/*
  getContacts(): Observable<Contact[]>{
    //return this.contacts.slice();
    return this.http.get<Contact[]>('http://localhost:3000/contacts')
      .pipe(
        tap((contacts: Contact[]) => {
          this.contacts = contacts;
          console.log(contacts)
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
  */

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:27017/contacts').pipe(
      map((contact: Contact[]) => {
        return contact.map(d => new Contact(d._id, d.id, d.name, d.email, d.phone, d.imageUrl, d.group));
      }),
      catchError((error: HttpErrorResponse) => {
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

  addContact(contacts: Contact) {
    if (!contacts) {
      return;
    }

    // make sure id of the new Document is empty
    contacts.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contacts: Contact }>('http://localhost:27017/contacts',
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
    this.http.put('http://localhost:27017/contacts/' + originalContact.id,
    newContact, { headers: headers })
      .subscribe(
        (response: any) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

deleteContact(contacts: Contact) {

  if (!contacts) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === contacts.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:27017/contacts/' + contacts.id)
    .subscribe(
      (response: any) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );
}

/*
  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      console.log(this.contacts)
        let currentId = parseInt(contact.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
  }
  */
  getMaxId(): number {
    let maxId = 0;
    if (Array.isArray(this.contacts)) {
      for (let contact of this.contacts) {
        let currentId = parseInt(contact.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    } else {
      console.error('this.contacts is not an array:', this.contacts);
    }
    return maxId;
  }


  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactsListChangedEvent.next(this.contacts.slice())
  }

  constructor(private http: HttpClient){
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  
}

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  contacts!: Contact[];

  constructor(private contactsService: ContactsServiceService){

  }


  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.contactsService.contactChanged
      .subscribe((contacts: Contact[]) =>{
        this.contacts = contacts;
      })
  }

}

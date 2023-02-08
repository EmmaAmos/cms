import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  contacts!: Contact[];

  constructor(private contactsService: ContactsServiceService, private router: Router, private route: ActivatedRoute){

  }


  ngOnInit() {
    /*Contact Click Change Listener*/
    this.contacts = this.contactsService.getContacts();
    this.contactsService.contactChanged
      .subscribe((contacts: Contact[]) =>{
        this.contacts = contacts;
      })

    /*Contact Delete Listener*/
    this.contacts = this.contactsService.getContacts();
    this.contactsService.contactChangedEvent
      .subscribe((contacts: Contact[]) =>{
        this.contacts = contacts;
      });
  }

  onNewContact() {
    this.router.navigate(['newContact'], {relativeTo: this.route});
  }

}

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

  contact!: Contact[];
  editMode: boolean = false;
  term!: string

  constructor(private contactsService: ContactsServiceService, private router: Router, private route: ActivatedRoute){

  }


  ngOnInit() {

    this.contactsService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contact = contacts;
      },
      (error: any) => {
        console.error('Error fetching contacts: ', error);
      }
    );

    /*Contact Click Change Listener
    this.contact = this.contactsService.getContacts();
    this.contactsService.contactChanged
      .subscribe((contacts: Contact[]) =>{
        this.contact = contacts;
      })*/

    /*Contact Delete Listener
    this.contact = this.contactsService.getContacts();
    this.contactsService.contactChangedEvent
      .subscribe((contacts: Contact[]) =>{
        this.contact = contacts;
      });*/
  }

  onNewContact() {
    this.router.navigate(['newContact'], {relativeTo: this.route});
    this.editMode = true;
    console.log('this is the state of this edit mode'+ this.editMode)
  }

  search(value: string) {
    this.term = value;
  }

}

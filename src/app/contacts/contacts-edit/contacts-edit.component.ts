import { group } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit{
  //@ViewChild(f) = contactForm;

  //id!: number;
  //editMode = false;
 // contact!: Contact;
  //originalContact!: Contact;
 // groupContacts: Contact[] = [];
  index!: number;
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(private contactService: ContactsServiceService, private route: ActivatedRoute, private router: Router) {

  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
 }

  addToGroup($event: any){
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
       return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(){
    if (this.index < 0 || this.index >= this.groupContacts.length) {
      return;
   }
   this.groupContacts.splice(this.index, 1);
  }

  onCancel(){
    this.router.navigate(['/edit'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
    newContact.id = value.id;
    newContact.name = value.name;
    newContact.email = value.email;
    newContact.phone = value.phone;
    newContact.imageUrl = value.imageUrl;
    newContact.group = value.group;

    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
    });
  }

}

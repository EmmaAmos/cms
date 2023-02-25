import { Component, OnInit } from '@angular/core';
import {  FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit{

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
      console.log('this'+newContact+'was made')
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      console.log('this'+newContact+'='+this.contact.id)
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
        console.log('operation isInvalidContact worked')
         return true;
      }
    }
    return false;
  }

    addToGroup($event: any) {
      const selectedContact: Contact = $event.dragData;
      console.log('drag event is working'+ selectedContact);
      const invalidGroupContact = this.isInvalidContact(selectedContact);    
      if (invalidGroupContact){
        return;
      }
      this.groupContacts.push(selectedContact);
      console.log('operation worked'+ selectedContact)
    }

  onRemoveItem(){
    if (this.index < 0 || this.index >= this.groupContacts.length) {
      return;
   }
   this.groupContacts.splice(this.index, 1);
  }

  onCancel(){
    this.router.navigate(['/contacts'], {relativeTo: this.route});
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
    console.log('this is the state of this edit mode'+ this.editMode)
    if (this.editMode === true) {
      console.log('this is the state of this edit mode'+ this.editMode)
      this.contactService.updateContact(this.originalContact, newContact);
      console.log('Update Succsess')
    } else {
      this.contactService.addContact(newContact);
      console.log('Addition Succsess')
    }
    this.router.navigate(['/contacts']);
  }

  /* my originalcode
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
      if(this.contact){
        this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
      }
    });
  }
  */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id: string | undefined = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      const originalContact: Contact | undefined = this.contactService.getContact(id);
      if (!originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if(this.contact){
        this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
      }
      /*robot code
      const contact: Contact = {...originalContact}; // spread operator used to clone the original contact
      this.contact = contact;
      if (this.contact.group) {
        this.groupContacts = {...this.contact.group}; // spread operator used to clone the contact's group
      }*/
    });
  }

}

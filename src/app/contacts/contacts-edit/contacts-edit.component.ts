import { Component, Directive, forwardRef, OnInit } from '@angular/core';
import {  FormGroup, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css'],
})

export class ContactsEditComponent implements OnInit {

  index!: number;
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactsServiceService, 
    private route: ActivatedRoute, 
    private router: Router) {

  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      console.log('this '+newContact+ ' = '+this.contact.id)
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
    console.log('drag event is working'+ selectedContact.id);
    const invalidGroupContact = this.isInvalidContact(selectedContact);    
    if (invalidGroupContact){
      console.log('the editMode is '+ this.editMode +' in addToGroup')
      return;
    }
    this.groupContacts.push(selectedContact);
    console.log('operation addToGroup worked '+ selectedContact.id)
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
    if (this.editMode === true) {
      console.log('this is the state of this edit mode'+ this.editMode +' in onSubmit')
      this.contactService.updateContact(this.originalContact, newContact);
      console.log('Update Succsess')
    } else {
      this.contactService.addContact(newContact);
      console.log('Addition Succsess')
    }
    console.log(this.contactService.getContacts())
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

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id: string | undefined = params['id'];
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
      console.log("Edit mode is: "+ this.editMode);
      // copies originalDocument object and into this.document object - no reference passed
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
    })
  }
  */

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        if (id === undefined || id === null) {
          this.editMode = false;
          console.log('the editMode is '+ this.editMode +' in ngOnInit for if 1')
          return;
        }
        
        const originalContact = this.contactService.getSingleContact(id);
        if (originalContact === undefined || originalContact === null) {
          console.log('the editMode is '+ this.editMode +' in ngOnInit for if 2')
          return;
        }
        this.editMode = true;
        this.contact = { ...originalContact };
  
        if (this.contact.group) {
          this.groupContacts = [ ...this.contact.group ];
          console.log('the editMode is '+ this.editMode +' in ngOnInit for if 3')
        }
      }
    );
  }

}

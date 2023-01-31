import { Component, ViewChild, ElementRef } from '@angular/core';

import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent {
  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('emailInput') emailInputRef!: ElementRef;
  @ViewChild('phoneInput') phoneInputRef!: ElementRef;
  @ViewChild('imageUrlInput') imageUrlInputRef!: ElementRef;
  @ViewChild('groupInput') groupInputRef!: ElementRef;

  constructor(private contactService: ContactsServiceService) {

  }

  onAddItem() {
    const ingID = this.idInputRef.nativeElement.value;
    const ingName = this.nameInputRef.nativeElement.value;
    const ingEmail = this.emailInputRef.nativeElement.value;
    const ingPhone = this.phoneInputRef.nativeElement.value;
    const ingImgeUrl = this.imageUrlInputRef.nativeElement.value;
    const ingGroup = this.groupInputRef.nativeElement.value;

    const newContact = new Contact(ingID, ingName, ingEmail, ingPhone, ingImgeUrl, ingGroup);
    this.contactService.addContact(newContact);
  }

}

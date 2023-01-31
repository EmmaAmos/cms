import { Component, Input, } from '@angular/core';
import { ContactsServiceService } from '../../contacts-service.service';

import { Contact } from '../contact-list.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {

  @Input() contact!: Contact;



  constructor(private contactService: ContactsServiceService) {}


  onSelected() {
    this.contactService.contactSelected.emit(this.contact);
  }
}

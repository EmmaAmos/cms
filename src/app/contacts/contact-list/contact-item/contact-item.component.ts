import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Contact } from '../contact-list.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {

  @Input() contact!: Contact;

  @Output() contactSelected = new EventEmitter<void>();

  constructor() {}


  onSelected() {
    this.contactSelected.emit();
  }
}

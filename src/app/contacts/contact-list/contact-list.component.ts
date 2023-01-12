import { Component } from '@angular/core';
import { Contact } from '../contact.model.ts';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts: Contact[] =[
    new Contact('1234', 'Gorden', 'myEmail@gamil.com', '2468-345-6789', 'https://www.scrolldroll.com/wp-content/uploads/2021/12/best-gordon-ramsay-memes-2.jpg', 'cooking')
  ];
}

import { Component } from '@angular/core';

import { ContactVeiwable } from '../../shared/contact-veiwable.model';

@Component({
  selector: 'app-contacts-veiw-list',
  templateUrl: './contacts-veiw-list.component.html',
  styleUrls: ['./contacts-veiw-list.component.scss']
})
export class ContactsVeiwListComponent {
  veiwContacts: ContactVeiwable[] = [
    new ContactVeiwable ('12234', 'Ivan', 'fakeEmail@gmail.com', '1-800-473-5896', 'https://steemitimages.com/p/C3TZR1g81UNcexr7CN6oLFxdYPTk9EAY9hdGJZM5wxLb8Jbjf8UczwEQ5nmRUVkJcexpd4HfJu5J31pwnufZycCemUAsAPXV2De6aNFUkGWZRVNUQy8TwJv?format=match&mode=fit&width=640', 'history')
  ];
}

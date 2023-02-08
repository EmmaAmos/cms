import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact-list/contact-list.model';
import { ContactsServiceService } from '../contacts-service.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{

  contact!: Contact;
  id!: number;

  contacts: Contact[] =[
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', []),
  ];

  constructor( private contactsService: ContactsServiceService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) =>{
              this.id = +params['id'];
              this.contact = this.contactsService.getSingleContact(this.id);
          }
        );
  }

  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.contactsService.deleteContact(this.contact);
    this.router.navigate(['contacts'], {relativeTo: this.route})
    //route back to the '/documents' URL
 }


}

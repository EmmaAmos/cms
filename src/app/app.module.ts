import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesItemComponent } from './messages/messages-item/messages-item.component';
import { MessagesEditComponent } from './messages/messages-list/messages-edit/messages-edit.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentsItemComponent } from './documents/documents-list/documents-item/documents-item.component';
import { DropDownDirectiveDirective } from './header/drop-down.directive.directive';
import { ContactsServiceService } from './contacts/contacts-service.service';
import { ContactsEditComponent } from './contacts/contacts-edit/contacts-edit.component';
import { DocumentsServiceService } from './documents/documents-service.service';
import { MessagesServiceService } from './messages/messages-service.service';
import { DocumentsEditComponent } from './documents/documents-edit/documents-edit.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    MessagesComponent,
    MessagesItemComponent,
    MessagesEditComponent,
    MessagesListComponent,
    DocumentsDetailComponent,
    DocumentsListComponent,
    DocumentsItemComponent,
    DropDownDirectiveDirective,
    ContactsEditComponent,
    DocumentsEditComponent,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ContactsServiceService, DocumentsServiceService, MessagesServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

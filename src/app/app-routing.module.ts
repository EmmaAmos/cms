import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactsEditComponent } from './contacts/contacts-edit/contacts-edit.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';
import { DocumentsEditComponent } from './documents/documents-edit/documents-edit.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch:'full' },
  { path: 'contacts', component: ContactsComponent, children:[ 
    {path: 'newContact', component: ContactsEditComponent}, {path: 'new', component: ContactsEditComponent}, {path: ':id', component: ContactDetailComponent}, {path: ':id/edit', component: ContactsEditComponent} 
  ]},

  {path: 'documents', component: DocumentsComponent, children:[
    {path: 'newDocument', component: DocumentsEditComponent}, {path: 'new', component: DocumentsEditComponent}, {path: ':id', component: DocumentsDetailComponent}, {path: ':id/edit', component: DocumentsEditComponent}
  ]},
  
  { path: 'messages', component: MessagesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

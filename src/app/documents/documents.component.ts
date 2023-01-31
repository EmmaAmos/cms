import { Component, Input } from '@angular/core';
import { DocumentsServiceService } from './documents-service.service';

import { Documents } from './documents.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsServiceService]
})
export class DocumentsComponent {
  selectedDocument!: Documents;


  constructor(private documentService: DocumentsServiceService) {

  }

ngOnInit() {
  this.documentService.documentSelected
    .subscribe((document: Documents) =>{
      this.selectedDocument = document;
    });
}
}

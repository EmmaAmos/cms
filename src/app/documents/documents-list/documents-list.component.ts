import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DocumentsServiceService } from '../documents-service.service';

import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent {

  @Output() documentWasSelceted= new EventEmitter<Documents>();

  documents: Documents[] = []

  onDocumentSelected(document: Documents) {
    this.documentWasSelceted.emit(document);
  }

  constructor(private documentService: DocumentsServiceService){

  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChanged
      .subscribe((documents: Documents[]) =>{
        this.documents = documents;
      })
  }
}

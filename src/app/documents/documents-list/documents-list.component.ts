import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private documentService: DocumentsServiceService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChanged
      .subscribe((documents: Documents[]) =>{
        this.documents = documents;
      })
  }

  onNewDocument() {
    this.router.navigate(['newDocument'], {relativeTo: this.route});
  }
}

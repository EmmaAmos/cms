import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsServiceService } from '../documents-service.service';

import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit{

  @Output() documentWasSelceted= new EventEmitter<Documents>();

  documents: Documents[] = []

  onDocumentSelected(document: Documents) {
    this.documentWasSelceted.emit(document);
  }

  constructor(private documentService: DocumentsServiceService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit() {
    /*Document Click Change Listener*/
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChanged
      .subscribe((documents: Documents[]) =>{
        this.documents = documents;
      });

      /*Document Delete Listener*/
      this.documents = this.documentService.getDocuments();
      this.documentService.documentChangedEvent
        .subscribe((documents: Documents[]) =>{
          this.documents = documents;
        });
  }

  onNewDocument() {
    this.router.navigate(['newDocument'], {relativeTo: this.route});
  }


}

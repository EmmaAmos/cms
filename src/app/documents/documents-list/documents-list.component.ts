import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentsServiceService } from '../documents-service.service';

import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit, OnDestroy{

  @Output() documentWasSelceted= new EventEmitter<Documents>();

  private subscription!: Subscription;
  term!: string
  documents: Documents[] = [];

  onDocumentSelected(document: Documents) {
    this.documentWasSelceted.emit(document);
    console.log('this document was selected '+document)
  }

  constructor(private documentService: DocumentsServiceService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit() {

    //robo code
    this.documentService.getDocuments().subscribe(
      (documents: Documents[]) => {
        this.documents = documents;
      },
      (error: any) => {
        console.error('Error fetching documents: ', error);
      }
    );

    /*Testing Jessica's code
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Documents[]) => {
        this.documents = documents;
      }
    )
    this.documentService.getDocuments();
    */
    /*Document Click Change Listener 
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChanged
      .subscribe((documents: Documents[]) =>{
        this.documents = documents;
      });*/

      /*Document Delete Listener
      this.documents = this.documentService.getDocuments();
      this.documentService.documentChangedEvent
        .subscribe((documents: Documents[]) =>{
          this.documents = documents;
        });*/
  }

  onNewDocument() {
    this.router.navigate(['newDocument'], {relativeTo: this.route});
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }

}

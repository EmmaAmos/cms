import { Component, Output, EventEmitter } from '@angular/core';

import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent {

  @Output() documentWasSelceted= new EventEmitter<Documents>();

  documents: Documents[] =[
    new Documents('345','Math Worksheet','A quick worksheet for the weekly math assignment','https://www.timestables.com/1-times-table-worksheets.html','Work on sheet 1.'),
    new Documents('346','English Worksheet','A quick worksheet for the weekly english assignment','https://www.englishbanana.com/worksheets/categories/elementary-english-worksheets/','Work on section Asking Questions 1.')
  ]

  onDocumentSelected(document: Documents) {
    this.documentWasSelceted.emit(document);
  }
}

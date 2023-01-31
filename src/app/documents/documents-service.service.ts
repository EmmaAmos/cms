import { Injectable, EventEmitter } from '@angular/core';

import { Documents } from '../documents/documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsServiceService {
  documentSelected = new EventEmitter<Documents>();

  documentChanged = new EventEmitter<Documents[]>();

  private documents: Documents[] =[
    new Documents('345','Math Worksheet','A quick worksheet for the weekly math assignment','https://www.timestables.com/1-times-table-worksheets.html',[]),
    new Documents('346','English Worksheet','A quick worksheet for the weekly english assignment','https://www.englishbanana.com/worksheets/categories/elementary-english-worksheets/',[])
  ]

  getDocuments(): Documents[]{
    return this.documents.slice();
  }

  getDocument(id: string) {
    Documents
      
  }

  addDocument(documents: Documents) {
    this.documents.push(documents);
    this.documentChanged.emit(this.documents.slice());
  }


  constructor(){
    this.documents = MOCKDOCUMENTS;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Documents } from '../documents/documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsServiceService {
  documentSelected = new Subject<Documents>();

  documentChanged = new Subject<Documents[]>();

  documentChangedEvent = new Subject<Documents[]>();

  documentListChangedEvent = new Subject<Documents[]>();


  maxDocumentId = 1;

  private documents: Documents[] =[
    new Documents('345','Math Worksheet','A quick worksheet for the weekly math assignment','https://www.timestables.com/1-times-table-worksheets.html',[]),
    new Documents('346','English Worksheet','A quick worksheet for the weekly english assignment','https://www.englishbanana.com/worksheets/categories/elementary-english-worksheets/',[])
  ]

  getDocuments(): Documents[]{
    return this.documents.slice();
  }

  getDocument(id: string) : Documents {
    for (let document of this.documents) {
      console.log('listed documet '+ document.name + document.id)
      if(document.id == id) {
         return document;
      }
    }
    return null!;
  }

  getSingleDocument(id: number){
    console.log('get Single Document '+ id)
    let i = 0;
    for(i = 0; i < this.documents.length; i++) {
      const document = this.documents[i];
      if (id == parseInt(document.id)) {
        break;
      }
    }
    return this.documents[i]
  }

  /*
  addDocument(documents: Documents) {
    this.documents.push(documents);
    this.documentChanged.next(this.documents.slice());
  }
  */

  addDocument(newDocument: Documents) {
    if (!newDocument) {
        return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument)
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Documents, newDocument: Documents) {
    if (!originalDocument || !newDocument) {
        return
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
        return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
  /*
  deleteDocument(document: Documents) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }
  */
 
  deleteDocument(document: Documents) {
    if (!document) {
        return;
    }
    let pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }
    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
        let currentId = parseInt(document.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
}

  constructor(){
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Documents } from '../documents/documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsServiceService {
  documentSelected = new Subject<Documents>();

  documentChanged = new Subject<Documents[]>();

  documentChangedEvent = new Subject<Documents[]>();

  documentListChangedEvent = new Subject<Documents[]>();


  maxDocumentId!: number;

  private documents: Documents[] =[
    new Documents('345','Math Worksheet','A quick worksheet for the weekly math assignment','https://www.timestables.com/1-times-table-worksheets.html',[]),
    new Documents('346','English Worksheet','A quick worksheet for the weekly english assignment','https://www.englishbanana.com/worksheets/categories/elementary-english-worksheets/',[])
  ]

 /*
  getDocuments(){ //original code
    //return this.documents.slice(); 
  }

 //robo code recent
  getDocuments() {//something is wrong and is effecting this.documents in doc-list.comp 
    this.http.get<Documents[]>('https://emma-sangularproject-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Documents[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error(error);
        }
      ); 
  } */
  //robo code
  getDocuments(): Observable<Documents[]> {
    return this.http.get<Documents[]>('https://emma-sangularproject-default-rtdb.firebaseio.com/documents.json')
      .pipe(
        tap((documents: Documents[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
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
  addDocument(newDocument: Documents) {
    if (!newDocument) {
        return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument)
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone)
  }
  */
  addDocument(document: Documents) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Documents }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  /*
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
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone)
  }
  */

  updateDocument(originalDocument: Documents, newDocument: Documents) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }


  storeDocuments(documents: Documents[]) {
    const documentsString = JSON.stringify(documents);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http
      .put('https://emma-sangularproject-default-rtdb.firebaseio.com/documents.json', documentsString, { headers })
      .subscribe(
        (response) => {
          console.log('Documents saved successfully', response);
        }, 
        (error) => {
          console.error('Error saving documents: ', error);
        });
  
    this.documentListChangedEvent.next(this.documents.slice());
  }

  /*
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
    //this.documentChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone)
  }
  */
  deleteDocument(document: Documents) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  constructor(private http: HttpClient){
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }


}

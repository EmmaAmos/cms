import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsServiceService } from '../documents-service.service';
import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-edit',
  templateUrl: './documents-edit.component.html',
  styleUrls: ['./documents-edit.component.css']
})
export class DocumentsEditComponent implements OnInit{

  originalDocument!: Documents; // References the original, unedited version of the document
  document!: Documents; // References the edited version of the document displayed in the form
  editMode: boolean = false;
  id!: number;

  constructor(private route: ActivatedRoute, private router: Router, private documentsService: DocumentsServiceService){

  }

  onCancel(){
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    // get values from form's fields
    const value = form.value;
    
    // create a new document
    const newDocument = new Documents(value.id, value.name, value.description, value.url, value.children);
  
    // assign the values in the form fields to the corresponding properties in the newDocument
    newDocument.name = value.name;
    newDocument.description = value.description;
    newDocument.url = value.url;
  
    // check if we are in edit mode
    if (this.editMode === true) {
      // if we are in edit mode, update the original document with the new document
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    } else {
      // if we are not in edit mode, add the new document to the document service
      this.documentsService.addDocument(newDocument);
    }
    
    // navigate back to the '/documents' URL
    this.router.navigate(['/documents']);
  }



  ngOnInit() {
    // subscribe to changes in the route parameters
    this.route.params.subscribe((params: Params) => {
      // get the 'id' parameter from the params object
      const id = params['id'];
  
      // if the 'id' parameter is undefined or null
      if (!id) {
        // set editMode to false and exit the function
        this.editMode = false;
        return;
      }
  
      // get the original document with the specified 'id'
      const originalDocument = this.documentsService.getDocument(id);
      
      // if no document was found with that 'id'
      if (!originalDocument) {
        // exit the function
        return;
      }
  
      // if a document was found with the specified 'id'
      // set editMode to true
      this.editMode = true;
  
      // create a deep copy of the original document and store it in the 'document' property
      // to avoid modifying the original document by reference
      this.document = JSON.parse(JSON.stringify(originalDocument));
    });
  }

}

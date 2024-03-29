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

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private documentsService: DocumentsServiceService){

  }

  onCancel(){
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    //this.editMode = true;
    const newDocument = new Documents(value._id, value.id, value.name, value.description, value.url, value.children);
    newDocument.name = value.name;
    newDocument.description = value.description;
    newDocument.url = value.url;
    console.log('this is the state of this edit mode '+ this.editMode)
    if (this.editMode === true) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
      console.log('Update Succsess')
    } else {
      console.log('this is the new document '+ newDocument)
      this.documentsService.addDocument(newDocument);
      console.log('Addition Succsess')
    }
    this.router.navigate(['/documents']);
    console.log(this.documentsService.getDocuments())
  }



  /*
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      const originalDocument = this.documentsService.getDocument(id);
      if (!originalDocument) {
        return;
      }
      this.editMode = true;
      console.log('the editMode is'+ this.editMode)
      this.document = JSON.parse(JSON.stringify(originalDocument));
    });
  }*/

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      console.log('the doc id is '+ id)
      if (id == null) {
        this.editMode = false;
        console.log("Edit mode is: "+ this.editMode);
        return;
      }
      this.originalDocument = this.documentsService.getDocument(id);
      console.log('this.originalDocument.id ' +this.originalDocument.id)
      if (this.originalDocument == null) {
        return;
      }
      this.editMode = true;
      console.log("Edit mode is: "+ this.editMode);
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    })
  }

}

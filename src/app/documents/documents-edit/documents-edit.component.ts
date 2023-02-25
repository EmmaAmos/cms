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
    const value = form.value;
    this.editMode = true;
    const newDocument = new Documents(value.id, value.name, value.description, value.url, value.children);
    newDocument.name = value.name;
    newDocument.description = value.description;
    newDocument.url = value.url;
    console.log('this is the state of this edit mode'+ this.editMode)
    if (this.editMode === true) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
      console.log('Update Succsess')
    } else {
      this.documentsService.addDocument(newDocument);
      console.log('Addition Succsess')
    }
    this.router.navigate(['/documents']);
  }



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
  }

}

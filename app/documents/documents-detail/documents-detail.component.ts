import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindServiceService } from 'src/app/wind-service.service';
import { DocumentsServiceService } from '../documents-service.service';

import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit{
  document!: Documents;
  id!: number;
  nativeWindow: any;

  constructor( private documentsService: DocumentsServiceService, private windowService: WindServiceService ,private route: ActivatedRoute, private router: Router) {
    this.nativeWindow = windowService.getNativeWindow();
  }

  ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.document = this.documentsService.getSingleDocument(this.id);
          }
        );
  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['documents'], {relativeTo: this.route})
    //route back to the '/documents' URL
 }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor( private documentsService: DocumentsServiceService ,private route: ActivatedRoute, private router: Router) {}

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

}
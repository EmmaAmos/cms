import { Component, Input } from '@angular/core';

import { Documents } from '../documents.model';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent {
  @Input() document!: Documents;

}
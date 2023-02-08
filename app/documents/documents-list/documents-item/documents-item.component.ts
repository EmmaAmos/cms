import { Component, Input, } from '@angular/core';
import { DocumentsServiceService } from '../../documents-service.service';

import { Documents } from '../../documents.model';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent {

  @Input() document!: Documents;

  @Input() index!: number;

  

  constructor(private documentService: DocumentsServiceService) {}

}

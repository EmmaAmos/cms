import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Documents } from '../../documents.model';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent {

  @Input() document!: Documents;

  @Output() documentSelected = new EventEmitter<void>();

  

  constructor() {}

  onSelected() {
    this.documentSelected.emit();
  }
}

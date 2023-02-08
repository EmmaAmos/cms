import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-documents-edit',
  templateUrl: './documents-edit.component.html',
  styleUrls: ['./documents-edit.component.css']
})
export class DocumentsEditComponent implements OnInit{

  id!: number;
  editMode = false;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] !=null;
            console.log(this.editMode);
          }
        );
  }

}

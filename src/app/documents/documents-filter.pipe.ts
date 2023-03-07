import { Pipe, PipeTransform } from '@angular/core';
import { Documents } from './documents.model';

@Pipe({
  name: 'documentsFilter'
})
export class DocumentsFilterPipe implements PipeTransform {

  transform(documents: Documents[], term: string) { 
    let filteredDocuments: Documents[] =[];  
    if (term && term.length > 0) {
      filteredDocuments = documents.filter(
          (documents:Documents) => documents.name.toLowerCase().includes(term.toLowerCase())
       );
    }
    if (filteredDocuments.length < 1){
       return documents;
    }
    return filteredDocuments;
 }
}

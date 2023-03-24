import { Injectable, EventEmitter } from '@angular/core';
import { Messages } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesServiceService {
  messageChanged = new EventEmitter<Messages[]>();

  messageChangedEvent = new Subject<Messages[]>();

  messageListChangedEvent  = new Subject<Messages[]>();

  maxMessageId!: number;
  
  private messages: Messages[] =[
    new Messages('2345', 'Hi', 'Do you want to meet up?', 'Emma A' ),
    new Messages('2346', 'Test Tomarrow', 'Hey, we have a test tomarrow, want to study?', 'David O.' )
  ]

  getMessages(): Observable<Messages[]>{
    //return this.messages.slice();
    return this.http.get<Messages[]>('http://localhost:3000/messages')
    .pipe(
      tap((messages: Messages[])=>{
        this.messages = messages;
        console.log(Messages)       
        this.maxMessageId = this.getMaxId();
        //console.log(this.getMaxId)
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageListChangedEvent.next(this.messages.slice());
      }),
      catchError(error =>{
        console.error(error);
        return throwError(error);
      })
    )
  }

  getMessage(id: string) : Messages {
    for (const message of this.messages) {
      if(message.id == id) {
         return message;
      }
    }
    return null!;
  }

  addMessage(messages: Messages) {
    if (!messages) {
      return;
    }

    // make sure id of the new Document is empty
    messages.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, messages: Messages }>('http://localhost:3000/messages',
    messages,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.messages);
          this.sortAndSend();
        }
      );
  }


  getMaxId(): number {
    let maxId = 0;
    for (let messages of this.messages) {
        let currentId = parseInt(messages.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
    }
    return maxId;
}

sortAndSend(){
  this.messages.sort((a,b)=>{
    if (a.sender < b.sender) {
      return -1;
    }
    if (a.sender > b.sender) {
      return 1;
    }
    return 0;
  });
  this.messageListChangedEvent.next(this.messages.slice())
}

  constructor(private http: HttpClient){
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }
}

export class Messages {
    public _id: string;
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: string;
 
    constructor( _id: string, id: string, subject: string, msgText: string, sender: string) {
        this._id =_id;
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}
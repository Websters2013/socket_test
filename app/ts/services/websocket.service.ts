import { Injectable } from "@angular/core";
import { Subject, Observable }    from 'rxjs/Rx';
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";

@Injectable()
export class WebSocketService {

    private ws: any;

    private domain:string = 'localhost:3000';

    private socket: WebSocketSubject<MessageEvent>;

    public message: Subject<Object> = new Subject();

    public opened: Subject<boolean> = new Subject();

    public started: boolean = false;

    sendMessage( message:string ):void{
        this.ws.next(message);
    }

    public start():void{
        let self = this;

        this.ws = Observable.webSocket(`ws://${ this.domain }/cable`);

        this.socket = this.ws.subscribe({
            next: (data:MessageEvent) => {
                if( data[ 'type' ] == 'welcome' ){
                    self.opened.next( true );
                    self.started= true;
                } else {
                    this.message.next( data );
                }
            },
            error: (err:Object) => {

                self.opened.next( false );
                self.started = false;
                this.message.next( { type: 'closed' } );

                self.socket.unsubscribe();

                setTimeout( () => {
                    self.start();
                }, 1000 );

            },
            complete: () => {
                this.message.next( { type: 'closed' } );
            }
        });


    }

    public close():void{
        this.socket.complete();
        this.socket.unsubscribe();
        this.started = false;
    }

}

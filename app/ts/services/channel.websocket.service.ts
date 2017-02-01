import { Injectable } from "@angular/core";
import { WebSocketService } from "./websocket.service";
import { Subject } from "rxjs/Subject";
import {Subscription} from "rxjs";

@Injectable()
export class ChannelWebsocketService {

    private openedSubscription:Subscription;
    private messageSubscription:Subscription;

    protected identifier:Object = {};
    protected identifierStr: string;
    protected socketStarted: boolean;

    public subscribed: Subject<boolean> = new Subject();
    public observableData: Subject<Object> = new Subject();

    constructor( private websocketService: WebSocketService ){}

    private static encodeIdentifier( identifier:string ):Object {
        return JSON.parse( identifier );
    }

    private static getDataString( parameters:Object ):string {
        let first = true,
            result = '';

        for ( let key in parameters ){

            if( first ){
                first = false;
                result +=  `\"${ key }\":\"${ parameters[ key ] }\"`;
            } else {
                result += `, \"${ key }\":\"${ parameters[ key ] }\"`;
            }
        }

        return `{ ${ result } }`;

    }

    private getSubscribeString():string{

        this.identifierStr = ChannelWebsocketService.getDataString( this.identifier );

        return JSON.stringify( { 'command': 'subscribe', 'identifier': this.identifierStr } );
    };

    private isThisChannel( data:Object ):boolean {

        if( data[ 'identifier' ] ){

            let identifier = ChannelWebsocketService.encodeIdentifier( data[ 'identifier' ] );

            if ( JSON.stringify( identifier ) === JSON.stringify( this.identifier ) ){

                return true;

            }
        }

        return false;
    }

    private observeMessage(){
        let self = this;

        this.messageSubscription = this.websocketService.message.subscribe( ( data: Object ) => {
            if( self.isThisChannel( data ) ){

                if( data[ 'type' ] == 'confirm_subscription' ){
                    this.subscribed.next( true );

                } else if ( data[ 'message' ] ){

                    this.observableData.next( data[ 'message' ] );

                }
            }

        } );

    }

    private observeOpened(){
        let self = this;

        self.socketStarted = this.websocketService.started;

        this.openedSubscription = this.websocketService.opened.subscribe( ( data: boolean ) => {

            self.socketStarted = data;

            if( data ){

                self.subscribe();

            }

        } );

        if( self.socketStarted ){

            self.subscribe();

        }

    }


    public send( data: Object ){
        this.websocketService.sendMessage( JSON.stringify( {
            command:'message',
            identifier: this.identifierStr,
            data: ChannelWebsocketService.getDataString( data )
        } ) );
    }

    public start( id?:number ){

        if ( id ){
            this.identifier[ 'id' ] = id + '';
        }

        this.observeOpened();
        this.observeMessage();
    }

    private subscribe(){
        this.websocketService.sendMessage( this.getSubscribeString() );
    }

    public unsubscribe(){
        if ( this.identifierStr ){
            this.websocketService.sendMessage( JSON.stringify( { 'command': 'unsubscribe', 'identifier': this.identifierStr } ) );
            this.subscribed.next( false );
            this.openedSubscription.unsubscribe();
            this.messageSubscription.unsubscribe();
        }
    }

}
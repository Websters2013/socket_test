import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from "@angular/forms";

import { AppComponent }        from '../components/app.component';

import { WebSocketService }    from "../services/websocket.service";
import { ChatChannelService }  from "../services/chat.channel.service";


@NgModule({
    imports:  [
        BrowserModule,
        FormsModule
    ],
    declarations: [ AppComponent ],
    providers:  [
        ChatChannelService,
        WebSocketService
    ],
    bootstrap:  [ AppComponent ]
})
export class AppModule { }

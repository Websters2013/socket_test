import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';

import { AppComponent }        from '../components/app.component';

import { WebSocketService }    from "../services/websocket.service";
import { ChatChannelService }  from "../services/chat.channel.service";


@NgModule({
    imports:  [ BrowserModule ],
    declarations: [ AppComponent ],
    providers:  [
        ChatChannelService,
        WebSocketService
    ],
    bootstrap:  [ AppComponent ]
})
export class AppModule { }

import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { AppComponent }      from '../components/app.component';
import { WebSocketService }  from "../services/websocket.service";


@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent ],
    providers:    [ WebSocketService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

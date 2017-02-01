import { Component }         from '@angular/core';
import { WebSocketService }  from "../services/websocket.service";
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    styleUrls: [ 'app/css/app.component.css' ]
})
export class AppComponent {

    constructor( private webSocketService:WebSocketService ){

        this.webSocketService.start();

    }

}

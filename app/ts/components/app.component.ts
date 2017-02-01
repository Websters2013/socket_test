import { Component }          from '@angular/core';

import { WebSocketService }    from "../services/websocket.service";
import { ChatChannelService }  from "../services/chat.channel.service";
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    styleUrls: [ 'app/css/app.component.css' ]
})
export class AppComponent {

    constructor( private webSocketService:WebSocketService,
                 private chatChannelService:ChatChannelService ){

        this.webSocketService.start();

    }

}

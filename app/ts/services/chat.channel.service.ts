import { Injectable }                 from "@angular/core";

import { ChannelWebsocketService }    from "./channel.websocket.service";
import { WebSocketService }             from "./websocket.service";

@Injectable()
export class ChatChannelService extends ChannelWebsocketService {

    constructor( websocketService: WebSocketService ){

        super( websocketService );

        this.identifier = {
            channel: 'ChatChannel',
            token: 'yI675j8sTrhB0EGnAXtxQQtt',
            chat_id: 82
        };

        this.start();

    }

}
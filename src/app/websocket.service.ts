import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Socket} from "ngx-socket-io";
import {environment} from "../env/env.prod";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // private socket;

  constructor(private socket: Socket) { }

  connect(token: string, lobbyPublicId: string): Subject<MessageEvent> {
    this.socket.ioSocket.io.opts.extraHeaders = {'token': window.sessionStorage.getItem('access_token'),
                                             'lobby_id': lobbyPublicId}
    this.socket.connect()

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('recieved ws data')
        observer.next(data);
      })

      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data))
      }
    }

    return Subject.create(observer, observable)



  }




}

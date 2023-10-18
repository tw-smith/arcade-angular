import { Component, OnInit } from '@angular/core';
import { Socket } from "ngx-socket-io";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lobby-detail',
  templateUrl: './lobby-detail.component.html',
  styleUrls: ['./lobby-detail.component.css']
})

// export class CustomSocket extends Socket{
//   constructor() {
//     const param = window.sessionStorage.getItem('access_token')
//     super({});
//   }
// }



export class LobbyDetailComponent implements OnInit{
  constructor(
    private socket: Socket,
    private route: ActivatedRoute
  ) {}


  players: any[] = []
  lobbyPublicId: string | null = ''

  ngOnInit() {
    this.lobbyPublicId = this.route.snapshot.paramMap.get('public_id')
    this.socket.ioSocket.io.opts.auth = {'token': window.sessionStorage.getItem('access_token')}
    this.socket.ioSocket.io.opts.extraHeaders = {'token': window.sessionStorage.getItem('access_token'),
                                                 'lobby_id': this.lobbyPublicId}
    console.log(this.socket.ioSocket.io.opts)
    this.socket.connect()
    this.socket.emit('join_lobby_request', this.lobbyPublicId)
    this.socket.on('lobby_status_update', (data: any) => {
      console.log('status update')
      this.players = data
      console.log(data)
    })
  }

  checkLobbyReady(){
    if ((this.players).length < 2) {
      return false
    }
    for (let player of this.players) {
      if (!player.is_ready) {
        return false
      }
    }
    return true
  }

  leaveLobby() {
    this.socket.emit('leave_lobby')
    this.socket.disconnect()
  }

  playerReady() {
      this.socket.emit('player_ready_toggle')
    }


}

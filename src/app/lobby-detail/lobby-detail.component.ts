import { Component, OnInit } from '@angular/core';
import { Socket } from "ngx-socket-io";
import {ActivatedRoute, Router} from "@angular/router";

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
    private route: ActivatedRoute,
    private router: Router
  ) {}


  players: any[] = []
  lobbyPublicId: string | null = ''
  lobbyFull: boolean = false

  ngOnInit() {
    this.lobbyPublicId = this.route.snapshot.paramMap.get('public_id')
    this.socket.ioSocket.io.opts.auth = {'token': window.sessionStorage.getItem('access_token')}
    this.socket.ioSocket.io.opts.extraHeaders = {'token': window.sessionStorage.getItem('access_token'),
                                                 'lobby_id': this.lobbyPublicId}
    console.log(this.socket.ioSocket.io.opts)
    this.socket.connect()
    this.socket.emit('join_lobby_request', this.lobbyPublicId, (response: string) => {
      if (response == 'Full') {
        this.lobbyFull = true
        this.socket.disconnect()
      }
      if (response == 'Not Found') {
        this.socket.disconnect()
        this.router.navigateByUrl('/lobbies')
      }
    })
    this.socket.on('lobby_status_update', (data: any) => {
      console.log('status update')
      this.players = data
      console.log(data)
    })
    this.socket.on('start_game', () => {
      this.router.navigateByUrl(`/play/${this.lobbyPublicId}`, {skipLocationChange: true})
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

  requestGameStart() {
    this.socket.emit('start_game_request', this.lobbyPublicId)
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../env/env.prod";
import {Observable} from "rxjs";
import {FormSubmitService} from "../form-submit.service";
import {NgForm} from "@angular/forms";
import {LobbyFormEntry} from "../forms";
import { Socket } from "ngx-socket-io";


@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.css']
})
export class LobbyListComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private formSubmitService: FormSubmitService,
    private socket: Socket
  ) {}

  lobbies: any[] = []
  serverMsg: string = ''
  model = new LobbyFormEntry('')

  // lobbies = [{'name': 'lobby1'}, {'name':'lobby2'}];

  ngOnInit() {
    this.lobbyRefresh()
    console.log(this.lobbies)
  }

  onSubmit(form: NgForm): void {
    this.socket.emit('testev')
    this.formSubmitService.submitLobbyCreateForm(form.value).subscribe(
      resp => this.lobbies = resp,
      error => this.serverMsg = error.error
    )
  }

  lobbyRefresh() {
    this.getLobbies().subscribe(
      resp => this.lobbies = resp
    )
  }


  getLobbies(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.arcadeBackendUrl}/lobbies`)
  }


}

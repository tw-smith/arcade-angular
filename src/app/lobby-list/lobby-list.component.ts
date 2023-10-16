import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../env/env.prod";
import {Observable} from "rxjs";
import {FormSubmitService} from "../form-submit.service";
import {NgForm} from "@angular/forms";
import {LobbyFormEntry} from "../forms";


@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.css']
})
export class LobbyListComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private formSubmitService: FormSubmitService
  ) {}

  lobbies: any[] = []
  serverMsg: string = ''
  model = new LobbyFormEntry('')

  // lobbies = [{'name': 'lobby1'}, {'name':'lobby2'}];

  ngOnInit() {
    this.getLobbies().subscribe(
      resp => this.lobbies = resp
    )
    console.log(this.lobbies)
  }

  onSubmit(form: NgForm): void {
    this.formSubmitService.submitLobbyCreateForm(form.value).subscribe(
      resp => this.lobbies = resp,
      error => this.serverMsg = error.error
    )
  }


  getLobbies(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.arcadeBackendUrl}/lobbies`)
  }


}

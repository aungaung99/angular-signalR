import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalVarialbe } from "../../global";
import { RootModel } from "../model/rool-modal";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {

  }

  getData(conversationId: string, pageSize: number, pageRow: number): Observable<RootModel> {
    let token: string = window.sessionStorage.getItem('accessToken') ?? '';
    let url: string = GlobalVarialbe.BASE_API_V1_URL + '/chat/conversations/' + conversationId + '?pageSize=' + pageSize + '&pageRows=' + pageRow;
    //console.log(url);
    return this.http.get<RootModel>(url);
  }
}

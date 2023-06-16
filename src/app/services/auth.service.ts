import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalVarialbe} from "../global";
import {RootModel} from "../model/rool-modal";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  post(tokeForm: FormData): Observable<RootModel> {
    let url: string = GlobalVarialbe.BASE_API_V1_URL + '/auth/access-token';
    return this.http.post<any>(url, tokeForm);
  }
}

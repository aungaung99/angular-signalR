import {Component, OnInit} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {HttpTransportType, LogLevel} from "@microsoft/signalr";
import {Route} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-signalR';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SignalRService } from './core/services/signal-r.service';
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-signalR';

  constructor(
    private signalRService: SignalRService,
    private authSerivce: AuthService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    if (this.authSerivce.isLoggedIn())
      this.signalRService.connect();
  }
}

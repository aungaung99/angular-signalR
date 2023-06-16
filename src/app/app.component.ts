import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "./core/services/auth.service";
import { SignalRService } from './core/services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-signalR';
  constructor(private signalRService: SignalRService) {
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.signalRService.connect();
  }
}

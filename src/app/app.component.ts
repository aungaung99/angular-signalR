import {Component, OnInit, AfterViewInit} from '@angular/core';
import {SignalRService} from './core/services/signal-r.service';
import {AuthService} from "./core/services/auth.service";
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-signalR';
  readonly VAPID_PUBLIC_KEY = 'BJdhtb8aRkQIzmi217hck-EUWO7jIQZR2dlT856wxCAFUgCTqnLY0n254gjSOAMNc9TydEf8aLoSjMMW_1QYBME';
  private baseUrl = 'http://localhost:5000/notifications';

  constructor(
    private signalRService: SignalRService,
    private authSerivce: AuthService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    if (this.authSerivce.isLoggedIn())
      this.signalRService.connect();

    Notification.requestPermission((res) => {
      if (res === 'granted') {
        console.log('Notification permission granted');
      }
      else{
        console.log(res);
      }
    });
  }
}

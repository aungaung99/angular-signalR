import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SignalRService } from './core/services/signal-r.service';
import { AuthService } from "./core/services/auth.service";
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-signalR';
  readonly VAPID_PUBLIC_KEY = 'BPn77rbo30ELEOgk5iFxsSgokTGUrXKdLJUxlXC0q_hh1G--m2tMgfkifJuDmjNgFOY8eCOfj_ZEf3aXS42-4F4';

  constructor(
    private signalRService: SignalRService,
    private authSerivce: AuthService,
    private swPush: SwPush,
    private swUpdate: SwUpdate) {
  }

  ngAfterViewInit(): void {
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.available
    //     .subscribe(() => {
    //       this.swUpdate
    //         .activateUpdate()
    //         .then(() => {
    //           //window.location.reload();
    //         });
    //     });
    // }
  }

  ngOnInit(): void {
    if (this.authSerivce.isLoggedIn())
      this.signalRService.connect();

    // Notification.requestPermission((res) => {
    //   if (res === 'granted') {
    //     console.log('Notification permission granted');
    //   }
    //   else {
    //     console.log(res);
    //   }
    // });
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => console.log(sub))
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}

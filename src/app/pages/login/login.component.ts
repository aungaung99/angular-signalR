import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SignalRService } from "../../core/services/signal-r.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username!: ElementRef<HTMLInputElement>;
  @ViewChild('password') password!: ElementRef<HTMLInputElement>;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private signalRService: SignalRService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']).then(r => true);
    }
  }

  isFailed: boolean = false;

  login(): void {
    this.isLoading = true;
    try {
      let formData = new FormData();
      formData.append('username', this.username.nativeElement.value);
      formData.append('password', this.password.nativeElement.value);
      this.authService.post(formData).subscribe((res) => {
        console.log(res);
        window.sessionStorage.setItem('access_token', res.data.access_token);
        window.sessionStorage.setItem('userId', res.data.user.id);
        this.signalRService.connect();
        this.isLoading = false;
        this.router.navigateByUrl('home');
      });
    } catch (e) {
      this.isFailed = true;
      this.isLoading = false;
    }
  }
}

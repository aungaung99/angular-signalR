import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ToastrService } from '../core/services/toastr.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      //this.toastr.info('Please Log In!');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}

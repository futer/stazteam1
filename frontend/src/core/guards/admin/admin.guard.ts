import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAdmin()) {
      return true;
    }
    this.auth.mainNavigate();
    return false;
  }
}

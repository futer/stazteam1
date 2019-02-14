import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {
  constructor( private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isEditor() || this.authService.isAdmin()) {
        return true;
      }
      this.authService.mainNavigate();
      return false;

  }
}

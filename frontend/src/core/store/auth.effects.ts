import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
@Injectable()

export class AuthEffects {
    constructor(
        private authService: AuthService,
        private actions: Actions,
        private router: Router
    ) {}

}

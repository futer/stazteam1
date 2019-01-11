import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  visible = true;

  constructor() {
   }

   hide() {
     this.visible = false;
   }

   show() {
     this.visible = true;
   }
}

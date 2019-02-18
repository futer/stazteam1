import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { AlertModel } from '../models/alert.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  constructor(
    private operations: OperationsService
  ) { }

  private alertStatus: Subscription;
  alert: AlertModel;

  ngOnInit() {
    this.alertStatus = this.operations.sendStatus.subscribe(res => {
      this.alert = res;
    });
  }

  ngOnDestroy() {
    this.alertStatus.unsubscribe();
  }
}

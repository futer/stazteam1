import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { AlertModel } from '../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  constructor(
    private operations: OperationsService
  ) { }

  alert: AlertModel;

  ngOnInit() {
    this.operations.sendStatus.subscribe(res => {
      if (res['errors']) {
        this.alert = {
          type: 'error',
          message: 'An error occured...'
        };
      }
      if (res['data']) {
        this.alert = {
          type: 'success',
          message: 'Your Doc ID: ' + res['data'].addDocument.id
        };
      }
    });
  }

  ngOnDestroy() {
    this.operations.sendStatus.unsubscribe();
  }
}

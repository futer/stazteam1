import { Component, OnInit } from '@angular/core';
import { PdfGeneratorService } from 'src/editor/services/pdf-generator.service';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';
import { Store } from '@ngrx/store';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSendModel } from 'src/editor/models/usersend.model';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.scss']
})
export class SendBtnComponent implements OnInit {

  constructor(
    private pdfGenerator: PdfGeneratorService,
    private textRef: ToolboxActionsService,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  sendPDF() {
    zip(
      this.textRef.textSource,
      this.store.pipe(map(data => <UserSendModel>{
        _id: data.auth.user._id,
        author: data.auth.user.firstName + ' ' + data.auth.user.lastName
      }))
    ).subscribe(res => {
      const doc = this.pdfGenerator.generatePDF(res[0]);
      doc.output('datauri');
      // TODO: Service to send data
    }).unsubscribe();
  }
}

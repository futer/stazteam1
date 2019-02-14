import { Component, OnInit } from '@angular/core';
import { PdfGeneratorService } from 'src/editor/services/pdf-generator.service';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';
import { Store } from '@ngrx/store';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSendModel, UserSendDataModel } from 'src/editor/models/usersend.model';
import { OperationsService } from 'src/editor/services/operations.service';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.scss']
})
export class SendBtnComponent implements OnInit {

  constructor(
    private pdfGenerator: PdfGeneratorService,
    private textRef: ToolboxActionsService,
    private operations: OperationsService,
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
      let encodedData = doc.output('datauristring');
      encodedData = encodedData.split(',');
      const prevData = res[0].nativeElement.textContent.substring(0, 200) + '...';

      this.operations.sendToReview(<UserSendDataModel>{
        author: res[1].author,
        content: encodedData[1],
        preview: prevData,
        title: 'testEditor',
        userId: res[1]._id
      });
    }).unsubscribe();
  }
}

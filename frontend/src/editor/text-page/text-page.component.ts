import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    HostListener,
} from '@angular/core';
import { PageGeneratorService } from '../services/page-generator.service';

@Component({
    selector: 'app-text-page',
    templateUrl: './text-page.component.html',
    styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit, AfterViewInit {
    pageHeight = -1;
    pageHeightSet = false;
    pageGenerated = false;
    keyStatus = false;
    @ViewChild('page') page: ElementRef;
    @HostListener('document:keydown', ['$event']) onkeydownHandler(
        event: KeyboardEvent
    ) {
        //if (this.keyStatus) { return; }
        //console.log('pressed');

        //this.keyStatus = true;
        // console.log('pressed');
        if (this.pageHeight < this.page.nativeElement.scrollHeight && !this.pageGenerated) {
          this.pageGen.pagesSource.subscribe(pages => {
              pages.push('2');
              console.log(pages);
              return;
          }).unsubscribe();
        }
    }

  //   @HostListener('document:keyup', ['$event']) onkeyupHandler(
  //     event: KeyboardEvent
  // ) {
  //     this.keyStatus = false;
  //     // if (this.pageHeight < this.page.nativeElement.scrollHeight && !this.pageGenerated) {
  //     //   this.pageGen.pagesSource.subscribe(pages => {
  //     //       // pages.push('2');
  //     //       console.log(pages);
  //     //       return;
  //     //   }).unsubscribe();
  //     // }
  // }

    constructor(
      private pageGen: PageGeneratorService
    ) {
        document.execCommand('DefaultParagraphSeparator', false, 'p');
    }

    ngOnInit() {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.pageHeight = this.page.nativeElement.scrollHeight;
            console.log(this.pageHeight);
        }, 100);
    }
}

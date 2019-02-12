import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DocComponent } from 'src/document/doc/doc.component';

import { MarkedTextLinesModel } from '../models/marked-text-lines.model';
import { MarkedTextModel } from '../models/marked-text.model';
import { TooltipComponent } from '../tooltip/tooltip.component';

import { Store } from '@ngrx/store';
import { zip, Subscription, combineLatest } from 'rxjs';

import * as Actions from '../../document/store/document.actions';
import * as Selectors from '../../document/store/document.selectors';
import { ReviewService } from '../services/review.service';
import { CommentModel } from 'src/app/models/comment.model';
import { DocumentService } from 'src/document/services/document.service';
import { DocumentModel } from 'src/document/models/document.model';

@Component({
    selector: 'app-review-doc',
    templateUrl: './review-doc.component.html',
    styleUrls: ['./review-doc.component.scss']
})
export class ReviewDocComponent implements OnInit, OnDestroy {
  @ViewChild(DocComponent, { read: ElementRef }) docElementRef: ElementRef;
  @ViewChild(TooltipComponent, { read: ElementRef }) tooltipComponent: ElementRef;

  id: string;
  pageNr: number;

  subscription: Subscription;

  tooltipPositionStyles: object;
  markedText: MarkedTextModel[];
  mouseEvent: MouseEvent;

  comments: CommentModel[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private reviewService: ReviewService,
    private docService: DocumentService,
    ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.subscription = combineLatest(
      this.docService.getPageNr(),
      this.store.select(Selectors.getDoc),
    )
      .subscribe(data => {
          this.pageNr = data[0];
          this.comments = data[1].data.document.comments.filter(doc => doc.page === this.pageNr);
        }
      );

    this.tooltipPositionStyles = this.getTooltipStyles();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showTooltip(event: MouseEvent) {
    const tooltipWidth = this.tooltipComponent.nativeElement.children[0].clientWidth;

    this.tooltipPositionStyles = this.getTooltipStyles(
      event.pageY + 15,
      event.pageX - (tooltipWidth / 2),
      'visible',
    );

    console.log(this.tooltipPositionStyles);
  }

  hideTooltip() {
    this.tooltipPositionStyles = this.getTooltipStyles();
    this.mouseEvent = null;
  }


  onMouseUp(event: MouseEvent) {
    this.mouseEvent = event;

    const selection = document.getSelection();

    if (!selection.toString()) { return; }

    const markedTxtArray = selection
      .toString()
      .split('\n')
      .filter(x => x !== '');

    const doc = this.docElementRef
      .nativeElement
      .children[0]
      .children[1]
      .children[0];

    const markedTxtLastIdx = markedTxtArray.length - 1;

    const markedTxtLines = this.getMarkedTextLines(
      selection,
      this.getContentPage(doc),
      markedTxtLastIdx
    );

    if (!markedTxtLines) { return; }

    console.log(markedTxtLines);
    this.markedText =  this.createMarkedTextModel(markedTxtArray, markedTxtLines);
    this.showTooltip(event);

    selection.empty();
  }

  getContentPage(htmlElement: HTMLElement) {
    const contentArray: string[] = [];
    for (let i = 0; i < htmlElement.children.length; i++) {
      contentArray.push(htmlElement.children[i].innerHTML);
    }
    return contentArray;
  }

  getMarkedTextLines(selection: Selection, contentPage: string[], markedTxtLastIdx: number): MarkedTextLinesModel {

    const indexOfAll = (arr, val) => arr.reduce(
      (acc, el, i) => (el === val ? [...acc, i] : acc), []
    );

    const firstLine = selection.anchorNode.textContent;
    const lastLine = selection.focusNode.textContent;

    const startLineIdxes = indexOfAll(contentPage, firstLine);
    const endLineIdxes = indexOfAll(contentPage, lastLine);

    let markedTextLines: MarkedTextLinesModel = null;

    for (let i = 0; i < startLineIdxes.length; i++) {
      for (let j = 0; j < endLineIdxes.length; j++) {
        const startLine = startLineIdxes[i];
        const endLine = endLineIdxes[j];

        if (Math.abs(startLine - endLine) === markedTxtLastIdx) {
          markedTextLines = {
            startLine: Math.min(startLine, endLine),
            endLine: Math.max(startLine, endLine),
          };
        }
      }
    }

    return markedTextLines;
  }

  createMarkedTextModel(markedTxtArray: string[], markedTxtLines: MarkedTextLinesModel): MarkedTextModel[] {
    const markedTxt: MarkedTextModel[] = [];

    for (let i = markedTxtLines.startLine; i <= markedTxtLines.endLine; i++) {
      markedTxt.push({
        line: i,
        content: markedTxtArray[i - markedTxtLines.startLine]
      });
    }

    return markedTxt;
  }

  private getTooltipStyles(height: number = -1000, width: number = -1000, visibility: string = 'hidden') {
    return {
      position: 'absolute',
      top: `${height}px`,
      left: `${width}px`,
      visibility: visibility,
    };
  }

  addComment(addComment) {
    console.log(addComment);

    this.reviewService.addCommentMutation({
      content: addComment.content,
      documentId: this.id,
      markedText: this.markedText,
      page: this.pageNr,
    })
      .subscribe(comments => {
        this.comments = comments;
      })
      .unsubscribe();

    this.hideTooltip();
  }
}

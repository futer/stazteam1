import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MarkedTextModel } from '../models/marked-text.model';
import { TooltipComponent } from '../tooltip/tooltip.component';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as Actions from '../store/review.actions';
import * as Selectors from '../store/review.selectors';
import { ReviewService } from '../services/review.service';
import { CommentModel } from '../../app/models/comment.model';
import { DocumentService } from '../../document/services/document.service';
import { flatMap } from 'rxjs/operators';


@Component({
    selector: 'app-review-doc',
    templateUrl: './review-doc.component.html',
    styleUrls: ['./review-doc.component.scss']
})
export class ReviewDocComponent implements OnDestroy {
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

    this.store.dispatch(new Actions.FetchDocumentComments(this.id));

    this.pageNr = 1;

    this.subscription = this.docService.getPageNr().pipe(
      flatMap(
        (pageNr) => {
          this.pageNr = pageNr;
          return this.store.select(Selectors.getComments(pageNr));
        }
      )
    ).subscribe(comments => {
      this.comments = comments;
    });

    this.tooltipPositionStyles = this.getTooltipStyles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showTooltip(event: MouseEvent) {
    const tooltipWidth = this.tooltipComponent.nativeElement.children[0].clientWidth;

    let x = event.pageX - (tooltipWidth / 2);

    if (x < 0) { x = 0; }

    this.tooltipPositionStyles = this.getTooltipStyles(
      event.pageY + 15,
      x,
      'visible',
    );
  }

  hideTooltip() {
    this.tooltipPositionStyles = this.getTooltipStyles();
    this.mouseEvent = null;
  }


  onMouseUp(event: MouseEvent) {
    if (event.toElement.nodeName !== 'P' && event.toElement.nodeName !== 'DIV') { return; }

    this.mouseEvent = event;

    const selection = document.getSelection();

    if (selection.toString() === '') { return; }

    const startContainer = selection.anchorNode;
    const endContainer =
      (selection.focusNode.nodeType === 3) ?
      selection.focusNode :
      selection.focusNode.previousSibling.firstChild;

    const startIdx = this.getIdxNode(startContainer.parentNode);
    const endIdx = this.getIdxNode(endContainer.parentNode);

    const firstIdx = Math.min(startIdx, endIdx);
    const lastIdx = Math.max(startIdx, endIdx);

    const markedTxtArray = selection
      .toString()
      .split('\n')
      .filter(x => x !== '');

    if (markedTxtArray.length === 0) { return; }

    this.markedText = this.createMarkedTextModel(markedTxtArray, firstIdx, lastIdx);

    this.showTooltip(event);

    selection.empty();
  }

  getIdxNode(node: Node) {
    let idx = 0;

    while ((node = node.previousSibling) != null) {
      idx ++;
    }

    return idx;
  }

  createMarkedTextModel(markedTxtArray: string[], firstLine: number, lastLine): MarkedTextModel[] {
    const markedTxt: MarkedTextModel[] = [];

    for (let i = firstLine; i <= lastLine; i++) {
      markedTxt.push({
        line: i,
        content: (markedTxtArray[i - firstLine]) ? markedTxtArray[i - firstLine] : '',
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
    this.reviewService.addCommentMutation({
      content: addComment.content,
      documentId: this.id,
      markedText: this.markedText,
      page: this.pageNr,
    }).toPromise()
      .then(() => {
        this.store.dispatch(new Actions.FetchDocumentComments(this.id));
      });

    this.hideTooltip();
  }
}

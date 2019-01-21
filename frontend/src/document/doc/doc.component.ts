import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DocState } from '../store/document.states';
import { getDoc } from '../store/document.selectors';
import * as Actions from '../store/document.actions';
import { DocumentModel } from '../models/document.model';

@Component({
    selector: 'app-doc',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit, OnDestroy {
    checkRoute: Subscription;
    docData: Subscription;

    id: number;
    doc: DocumentModel = {
        content: '',
    };

    constructor(private store: Store<DocState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.checkRoute = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.docData = this.store.select(getDoc).subscribe(docs => {
                if (!docs) {
                    console.log('empty boiii');
                    this.store.dispatch(new Actions.FetchDoc(this.id));
                }

                // if (docs) {
                //     docs.data.documents.forEach(obj => {
                //         if (this.id === obj['id']) {
                //             this.doc = {
                //                 author: obj['author'],
                //                 content: obj['content'],
                //                 date: obj['date'],
                //                 title: obj['title']
                //             };
                //         }
                //     });
                // }
            });
        });
    }

    ngOnDestroy() {
        this.checkRoute.unsubscribe();
        this.docData.unsubscribe();
    }
}

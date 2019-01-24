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
    document: DocumentModel = {
        data: {
            document: {
                author: '',
                content: '',
                date: '',
                title: ''
            }
        }
    };

    constructor(
        private store: Store<DocState>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.checkRoute = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.docData = this.store.select(getDoc).subscribe(doc => {
                if (!doc) {
                    console.log('empty boiii');
                    this.store.dispatch(new Actions.FetchDoc(this.id));
                }
                if (doc) {
                    const pdf = atob(doc.data.document.content);

                    this.document = {
                        data: {
                            document: {
                                author: doc.data.document.author,
                                content: pdf,
                                date: doc.data.document.date,
                                title: doc.data.document.title
                            }
                        }
                    };
                }
            });
        });
    }

    ngOnDestroy() {
        this.checkRoute.unsubscribe();
        this.docData.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DocState } from '../store/document.states';
import { getDoc } from '../store/document.selectors';
import * as Actions from '../store/document.actions';
import { DocumentModel } from '../models/document.model';
import * as PDFJS from 'pdfjs-dist';
@Component({
    selector: 'app-doc',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit, OnDestroy {
    checkRoute: Subscription;
    docData: Subscription;
    url: string;
    id: number;
    document: DocumentModel = {
        data: {
            document: {
                author: '',
                content: '',
                date: '',
                title: ''
            },
            like: false
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
                    this.store.dispatch(new Actions.FetchDoc(this.id));
                }
                if (doc) {
                    const decode = atob(doc.data.document.content);
                    const pdfBlob = new Blob([decode], {type: 'application/pdf'});

                    this.url = URL.createObjectURL(pdfBlob);

                    this.document = {
                        data: {
                            document: {
                                author: doc.data.document.author,
                                content: decode,
                                date: doc.data.document.date,
                                title: doc.data.document.title
                            },
                            like: doc.data.like
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

    downloadPDF() {
        console.log('begin download');
        window.location.href = this.url;
    }

    checkIfLiked(event) {
        console.log('ichecked', event.target.checked);

        switch (event) {
            case true: {
               // add like, mutation and store change if success
               break;
            }
            case false: {
               // delete like, mutation and store change if success
               break;
            }
            default: {
               console.log('what default?');
               break;
            }
         }
    }
}

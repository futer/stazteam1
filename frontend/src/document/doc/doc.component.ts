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

    id = this.route.snapshot.paramMap.get('id');
    document: DocumentModel = {
        data: {
            document: {
                id: '',
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
        console.log(this.route.snapshot.paramMap.get('id'));

        console.log('i went with such id: ', this.id);
        this.docData = this.store.select(getDoc).subscribe(doc => {
            console.log('asd', doc, this.id);
            if (doc && doc.data.document.id === this.id) {
                console.log('dis iz mi doc', doc);
                const decode = atob(doc.data.document.content);
                const pdfBlob = new Blob([decode], { type: 'application/pdf' });

                this.url = URL.createObjectURL(pdfBlob);

                this.document = {
                    data: {
                        document: {
                            id: doc.data.document.id,
                            author: doc.data.document.author,
                            content: decode,
                            date: doc.data.document.date,
                            title: doc.data.document.title
                        },
                        like: doc.data.like
                    }
                };
            } else {
                console.log('i dont have this doc');
                this.store.dispatch(new Actions.FetchDoc(this.id));
            }
        });
    }

    ngOnDestroy() {
        this.docData.unsubscribe();
    }

    downloadPDF() {
        console.log('begin download');
        window.location.href = this.url;
    }

    checkIfLiked(event) {
        console.log('ichecked', event.target.checked);

        switch (event.target.checked) {
            case true: {
                // add like, mutation and store change if success
                console.log('sad');
                this.store.dispatch(new Actions.AddLike(this.id.toString()));
                break;
            }
            case false: {
                // delete like, mutation and store change if success
                console.log('sad_delete');
                this.store.dispatch(new Actions.DeleteLike(this.id.toString()));
                break;
            }
            default: {
                console.log('what default?');
                break;
            }
        }
    }
}

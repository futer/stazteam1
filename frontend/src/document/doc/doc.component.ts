import {
    Component,
    OnInit,
    Input,
    OnDestroy
} from '@angular/core';
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

    @Input() returnTo = '/main';

    checkRoute: Subscription;
    private docData: Subscription;
    private url: string;
    private id: string;

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
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.docData = this.store.select(getDoc).subscribe(doc => {
            if (doc && doc.data.document.id === this.id) {
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
                this.store.dispatch(new Actions.FetchDoc(this.id));
            }
        });
    }

    ngOnDestroy() {
        this.docData.unsubscribe();
    }

    downloadPDF() {
        window.location.href = this.url;
    }

    checkIfLiked(event) {
        switch (event.target.checked) {
            case true: {
                this.store.dispatch(new Actions.AddLike(this.id.toString()));
                break;
            }
            case false: {
                this.store.dispatch(new Actions.DeleteLike(this.id.toString()));
                break;
            }
            default: {
                break;
            }
        }
    }
}

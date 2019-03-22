import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentContent } from 'app/shared/model/document-content.model';

@Component({
    selector: 'jhi-document-content-detail',
    templateUrl: './document-content-detail.component.html'
})
export class DocumentContentDetailComponent implements OnInit {
    documentContent: IDocumentContent;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentContent }) => {
            this.documentContent = documentContent;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}

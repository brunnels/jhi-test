import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDocumentContent } from 'app/shared/model/document-content.model';
import { AccountService } from 'app/core';
import { DocumentContentService } from './document-content.service';

@Component({
    selector: 'jhi-document-content',
    templateUrl: './document-content.component.html'
})
export class DocumentContentComponent implements OnInit, OnDestroy {
    documentContents: IDocumentContent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected documentContentService: DocumentContentService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.documentContentService
            .query()
            .pipe(
                filter((res: HttpResponse<IDocumentContent[]>) => res.ok),
                map((res: HttpResponse<IDocumentContent[]>) => res.body)
            )
            .subscribe(
                (res: IDocumentContent[]) => {
                    this.documentContents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentContents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocumentContent) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInDocumentContents() {
        this.eventSubscriber = this.eventManager.subscribe('documentContentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

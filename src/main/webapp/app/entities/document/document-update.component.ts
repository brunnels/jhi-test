import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IDocumentContent } from 'app/shared/model/document-content.model';
import { DocumentContentService } from 'app/entities/document-content';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site';

@Component({
    selector: 'jhi-document-update',
    templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
    document: IDocument;
    isSaving: boolean;

    contents: IDocumentContent[];

    sites: ISite[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected documentService: DocumentService,
        protected documentContentService: DocumentContentService,
        protected siteService: SiteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
        this.documentContentService
            .query({ filter: 'document-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDocumentContent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDocumentContent[]>) => response.body)
            )
            .subscribe(
                (res: IDocumentContent[]) => {
                    if (!this.document.content || !this.document.content.id) {
                        this.contents = res;
                    } else {
                        this.documentContentService
                            .find(this.document.content.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDocumentContent>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDocumentContent>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDocumentContent) => (this.contents = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.siteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISite[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISite[]>) => response.body)
            )
            .subscribe((res: ISite[]) => (this.sites = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentContentById(index: number, item: IDocumentContent) {
        return item.id;
    }

    trackSiteById(index: number, item: ISite) {
        return item.id;
    }
}

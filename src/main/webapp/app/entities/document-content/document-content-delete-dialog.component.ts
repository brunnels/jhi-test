import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentContent } from 'app/shared/model/document-content.model';
import { DocumentContentService } from './document-content.service';

@Component({
    selector: 'jhi-document-content-delete-dialog',
    templateUrl: './document-content-delete-dialog.component.html'
})
export class DocumentContentDeleteDialogComponent {
    documentContent: IDocumentContent;

    constructor(
        protected documentContentService: DocumentContentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentContentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentContentListModification',
                content: 'Deleted an documentContent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-content-delete-popup',
    template: ''
})
export class DocumentContentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentContent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentContentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentContent = documentContent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/document-content', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/document-content', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

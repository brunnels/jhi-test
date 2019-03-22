import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISiteCategory } from 'app/shared/model/site-category.model';
import { SiteCategoryService } from './site-category.service';

@Component({
    selector: 'jhi-site-category-delete-dialog',
    templateUrl: './site-category-delete-dialog.component.html'
})
export class SiteCategoryDeleteDialogComponent {
    siteCategory: ISiteCategory;

    constructor(
        protected siteCategoryService: SiteCategoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.siteCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'siteCategoryListModification',
                content: 'Deleted an siteCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-site-category-delete-popup',
    template: ''
})
export class SiteCategoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ siteCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SiteCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.siteCategory = siteCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/site-category', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/site-category', { outlets: { popup: null } }]);
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

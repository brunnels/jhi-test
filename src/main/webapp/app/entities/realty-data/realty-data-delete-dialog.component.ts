import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRealtyData } from 'app/shared/model/realty-data.model';
import { RealtyDataService } from './realty-data.service';

@Component({
    selector: 'jhi-realty-data-delete-dialog',
    templateUrl: './realty-data-delete-dialog.component.html'
})
export class RealtyDataDeleteDialogComponent {
    realtyData: IRealtyData;

    constructor(
        protected realtyDataService: RealtyDataService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.realtyDataService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'realtyDataListModification',
                content: 'Deleted an realtyData'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-realty-data-delete-popup',
    template: ''
})
export class RealtyDataDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ realtyData }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RealtyDataDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.realtyData = realtyData;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/realty-data', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/realty-data', { outlets: { popup: null } }]);
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

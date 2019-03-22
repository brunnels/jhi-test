import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRealtyData } from 'app/shared/model/realty-data.model';
import { AccountService } from 'app/core';
import { RealtyDataService } from './realty-data.service';

@Component({
    selector: 'jhi-realty-data',
    templateUrl: './realty-data.component.html'
})
export class RealtyDataComponent implements OnInit, OnDestroy {
    realtyData: IRealtyData[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected realtyDataService: RealtyDataService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.realtyDataService
            .query()
            .pipe(
                filter((res: HttpResponse<IRealtyData[]>) => res.ok),
                map((res: HttpResponse<IRealtyData[]>) => res.body)
            )
            .subscribe(
                (res: IRealtyData[]) => {
                    this.realtyData = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRealtyData();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRealtyData) {
        return item.id;
    }

    registerChangeInRealtyData() {
        this.eventSubscriber = this.eventManager.subscribe('realtyDataListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

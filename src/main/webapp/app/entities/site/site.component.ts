import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISite } from 'app/shared/model/site.model';
import { AccountService } from 'app/core';
import { SiteService } from './site.service';

@Component({
    selector: 'jhi-site',
    templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit, OnDestroy {
    sites: ISite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected siteService: SiteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.siteService
            .query()
            .pipe(
                filter((res: HttpResponse<ISite[]>) => res.ok),
                map((res: HttpResponse<ISite[]>) => res.body)
            )
            .subscribe(
                (res: ISite[]) => {
                    this.sites = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISite) {
        return item.id;
    }

    registerChangeInSites() {
        this.eventSubscriber = this.eventManager.subscribe('siteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

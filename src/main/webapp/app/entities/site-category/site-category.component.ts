import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISiteCategory } from 'app/shared/model/site-category.model';
import { AccountService } from 'app/core';
import { SiteCategoryService } from './site-category.service';

@Component({
    selector: 'jhi-site-category',
    templateUrl: './site-category.component.html'
})
export class SiteCategoryComponent implements OnInit, OnDestroy {
    siteCategories: ISiteCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected siteCategoryService: SiteCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.siteCategoryService
            .query()
            .pipe(
                filter((res: HttpResponse<ISiteCategory[]>) => res.ok),
                map((res: HttpResponse<ISiteCategory[]>) => res.body)
            )
            .subscribe(
                (res: ISiteCategory[]) => {
                    this.siteCategories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSiteCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISiteCategory) {
        return item.id;
    }

    registerChangeInSiteCategories() {
        this.eventSubscriber = this.eventManager.subscribe('siteCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

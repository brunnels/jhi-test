import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { IRealtyData } from 'app/shared/model/realty-data.model';
import { RealtyDataService } from 'app/entities/realty-data';
import { ISiteCategory } from 'app/shared/model/site-category.model';
import { SiteCategoryService } from 'app/entities/site-category';

@Component({
    selector: 'jhi-site-update',
    templateUrl: './site-update.component.html'
})
export class SiteUpdateComponent implements OnInit {
    site: ISite;
    isSaving: boolean;

    realtydata: IRealtyData[];

    sitecategories: ISiteCategory[];
    updatedAt: string;
    deletedAt: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected siteService: SiteService,
        protected realtyDataService: RealtyDataService,
        protected siteCategoryService: SiteCategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ site }) => {
            this.site = site;
            this.updatedAt = this.site.updatedAt != null ? this.site.updatedAt.format(DATE_TIME_FORMAT) : null;
            this.deletedAt = this.site.deletedAt != null ? this.site.deletedAt.format(DATE_TIME_FORMAT) : null;
        });
        this.realtyDataService
            .query({ filter: 'site-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IRealtyData[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRealtyData[]>) => response.body)
            )
            .subscribe(
                (res: IRealtyData[]) => {
                    if (!this.site.realtyData || !this.site.realtyData.id) {
                        this.realtydata = res;
                    } else {
                        this.realtyDataService
                            .find(this.site.realtyData.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IRealtyData>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IRealtyData>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IRealtyData) => (this.realtydata = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.siteCategoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISiteCategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISiteCategory[]>) => response.body)
            )
            .subscribe((res: ISiteCategory[]) => (this.sitecategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.site.updatedAt = this.updatedAt != null ? moment(this.updatedAt, DATE_TIME_FORMAT) : null;
        this.site.deletedAt = this.deletedAt != null ? moment(this.deletedAt, DATE_TIME_FORMAT) : null;
        if (this.site.id !== undefined) {
            this.subscribeToSaveResponse(this.siteService.update(this.site));
        } else {
            this.subscribeToSaveResponse(this.siteService.create(this.site));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISite>>) {
        result.subscribe((res: HttpResponse<ISite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRealtyDataById(index: number, item: IRealtyData) {
        return item.id;
    }

    trackSiteCategoryById(index: number, item: ISiteCategory) {
        return item.id;
    }
}

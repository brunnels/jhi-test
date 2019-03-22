import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRealtyData } from 'app/shared/model/realty-data.model';
import { RealtyDataService } from './realty-data.service';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site';

@Component({
    selector: 'jhi-realty-data-update',
    templateUrl: './realty-data-update.component.html'
})
export class RealtyDataUpdateComponent implements OnInit {
    realtyData: IRealtyData;
    isSaving: boolean;

    sites: ISite[];
    updatedAt: string;
    deletedAt: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected realtyDataService: RealtyDataService,
        protected siteService: SiteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ realtyData }) => {
            this.realtyData = realtyData;
            this.updatedAt = this.realtyData.updatedAt != null ? this.realtyData.updatedAt.format(DATE_TIME_FORMAT) : null;
            this.deletedAt = this.realtyData.deletedAt != null ? this.realtyData.deletedAt.format(DATE_TIME_FORMAT) : null;
        });
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
        this.realtyData.updatedAt = this.updatedAt != null ? moment(this.updatedAt, DATE_TIME_FORMAT) : null;
        this.realtyData.deletedAt = this.deletedAt != null ? moment(this.deletedAt, DATE_TIME_FORMAT) : null;
        if (this.realtyData.id !== undefined) {
            this.subscribeToSaveResponse(this.realtyDataService.update(this.realtyData));
        } else {
            this.subscribeToSaveResponse(this.realtyDataService.create(this.realtyData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRealtyData>>) {
        result.subscribe((res: HttpResponse<IRealtyData>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSiteById(index: number, item: ISite) {
        return item.id;
    }
}

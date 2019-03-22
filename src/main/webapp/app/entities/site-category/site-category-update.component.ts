import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISiteCategory } from 'app/shared/model/site-category.model';
import { SiteCategoryService } from './site-category.service';

@Component({
    selector: 'jhi-site-category-update',
    templateUrl: './site-category-update.component.html'
})
export class SiteCategoryUpdateComponent implements OnInit {
    siteCategory: ISiteCategory;
    isSaving: boolean;

    constructor(protected siteCategoryService: SiteCategoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ siteCategory }) => {
            this.siteCategory = siteCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.siteCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.siteCategoryService.update(this.siteCategory));
        } else {
            this.subscribeToSaveResponse(this.siteCategoryService.create(this.siteCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISiteCategory>>) {
        result.subscribe((res: HttpResponse<ISiteCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

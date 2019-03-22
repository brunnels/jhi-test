import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISiteCategory } from 'app/shared/model/site-category.model';

@Component({
    selector: 'jhi-site-category-detail',
    templateUrl: './site-category-detail.component.html'
})
export class SiteCategoryDetailComponent implements OnInit {
    siteCategory: ISiteCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ siteCategory }) => {
            this.siteCategory = siteCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}

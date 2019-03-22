import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRealtyData } from 'app/shared/model/realty-data.model';

@Component({
    selector: 'jhi-realty-data-detail',
    templateUrl: './realty-data-detail.component.html'
})
export class RealtyDataDetailComponent implements OnInit {
    realtyData: IRealtyData;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ realtyData }) => {
            this.realtyData = realtyData;
        });
    }

    previousState() {
        window.history.back();
    }
}

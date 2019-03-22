import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RealtyData } from 'app/shared/model/realty-data.model';
import { RealtyDataService } from './realty-data.service';
import { RealtyDataComponent } from './realty-data.component';
import { RealtyDataDetailComponent } from './realty-data-detail.component';
import { RealtyDataUpdateComponent } from './realty-data-update.component';
import { RealtyDataDeletePopupComponent } from './realty-data-delete-dialog.component';
import { IRealtyData } from 'app/shared/model/realty-data.model';

@Injectable({ providedIn: 'root' })
export class RealtyDataResolve implements Resolve<IRealtyData> {
    constructor(private service: RealtyDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRealtyData> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RealtyData>) => response.ok),
                map((realtyData: HttpResponse<RealtyData>) => realtyData.body)
            );
        }
        return of(new RealtyData());
    }
}

export const realtyDataRoute: Routes = [
    {
        path: '',
        component: RealtyDataComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.realtyData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RealtyDataDetailComponent,
        resolve: {
            realtyData: RealtyDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.realtyData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RealtyDataUpdateComponent,
        resolve: {
            realtyData: RealtyDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.realtyData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RealtyDataUpdateComponent,
        resolve: {
            realtyData: RealtyDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.realtyData.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const realtyDataPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RealtyDataDeletePopupComponent,
        resolve: {
            realtyData: RealtyDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.realtyData.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

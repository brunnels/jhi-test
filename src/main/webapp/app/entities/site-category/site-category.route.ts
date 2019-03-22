import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SiteCategory } from 'app/shared/model/site-category.model';
import { SiteCategoryService } from './site-category.service';
import { SiteCategoryComponent } from './site-category.component';
import { SiteCategoryDetailComponent } from './site-category-detail.component';
import { SiteCategoryUpdateComponent } from './site-category-update.component';
import { SiteCategoryDeletePopupComponent } from './site-category-delete-dialog.component';
import { ISiteCategory } from 'app/shared/model/site-category.model';

@Injectable({ providedIn: 'root' })
export class SiteCategoryResolve implements Resolve<ISiteCategory> {
    constructor(private service: SiteCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISiteCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SiteCategory>) => response.ok),
                map((siteCategory: HttpResponse<SiteCategory>) => siteCategory.body)
            );
        }
        return of(new SiteCategory());
    }
}

export const siteCategoryRoute: Routes = [
    {
        path: '',
        component: SiteCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.siteCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SiteCategoryDetailComponent,
        resolve: {
            siteCategory: SiteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.siteCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SiteCategoryUpdateComponent,
        resolve: {
            siteCategory: SiteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.siteCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SiteCategoryUpdateComponent,
        resolve: {
            siteCategory: SiteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.siteCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const siteCategoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SiteCategoryDeletePopupComponent,
        resolve: {
            siteCategory: SiteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.siteCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

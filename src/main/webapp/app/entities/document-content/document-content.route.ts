import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentContent } from 'app/shared/model/document-content.model';
import { DocumentContentService } from './document-content.service';
import { DocumentContentComponent } from './document-content.component';
import { DocumentContentDetailComponent } from './document-content-detail.component';
import { DocumentContentUpdateComponent } from './document-content-update.component';
import { DocumentContentDeletePopupComponent } from './document-content-delete-dialog.component';
import { IDocumentContent } from 'app/shared/model/document-content.model';

@Injectable({ providedIn: 'root' })
export class DocumentContentResolve implements Resolve<IDocumentContent> {
    constructor(private service: DocumentContentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentContent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentContent>) => response.ok),
                map((documentContent: HttpResponse<DocumentContent>) => documentContent.body)
            );
        }
        return of(new DocumentContent());
    }
}

export const documentContentRoute: Routes = [
    {
        path: '',
        component: DocumentContentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.documentContent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DocumentContentDetailComponent,
        resolve: {
            documentContent: DocumentContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.documentContent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DocumentContentUpdateComponent,
        resolve: {
            documentContent: DocumentContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.documentContent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DocumentContentUpdateComponent,
        resolve: {
            documentContent: DocumentContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.documentContent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentContentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DocumentContentDeletePopupComponent,
        resolve: {
            documentContent: DocumentContentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.documentContent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

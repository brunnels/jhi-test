import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISite } from 'app/shared/model/site.model';

type EntityResponseType = HttpResponse<ISite>;
type EntityArrayResponseType = HttpResponse<ISite[]>;

@Injectable({ providedIn: 'root' })
export class SiteService {
    public resourceUrl = SERVER_API_URL + 'api/sites';

    constructor(protected http: HttpClient) {}

    create(site: ISite): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(site);
        return this.http
            .post<ISite>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(site: ISite): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(site);
        return this.http
            .put<ISite>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISite[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(site: ISite): ISite {
        const copy: ISite = Object.assign({}, site, {
            updatedAt: site.updatedAt != null && site.updatedAt.isValid() ? site.updatedAt.toJSON() : null,
            deletedAt: site.deletedAt != null && site.deletedAt.isValid() ? site.deletedAt.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.updatedAt = res.body.updatedAt != null ? moment(res.body.updatedAt) : null;
            res.body.deletedAt = res.body.deletedAt != null ? moment(res.body.deletedAt) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((site: ISite) => {
                site.updatedAt = site.updatedAt != null ? moment(site.updatedAt) : null;
                site.deletedAt = site.deletedAt != null ? moment(site.deletedAt) : null;
            });
        }
        return res;
    }
}

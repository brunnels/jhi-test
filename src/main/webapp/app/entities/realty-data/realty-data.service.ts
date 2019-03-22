import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRealtyData } from 'app/shared/model/realty-data.model';

type EntityResponseType = HttpResponse<IRealtyData>;
type EntityArrayResponseType = HttpResponse<IRealtyData[]>;

@Injectable({ providedIn: 'root' })
export class RealtyDataService {
    public resourceUrl = SERVER_API_URL + 'api/realty-data';

    constructor(protected http: HttpClient) {}

    create(realtyData: IRealtyData): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(realtyData);
        return this.http
            .post<IRealtyData>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(realtyData: IRealtyData): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(realtyData);
        return this.http
            .put<IRealtyData>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRealtyData>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRealtyData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(realtyData: IRealtyData): IRealtyData {
        const copy: IRealtyData = Object.assign({}, realtyData, {
            updatedAt: realtyData.updatedAt != null && realtyData.updatedAt.isValid() ? realtyData.updatedAt.toJSON() : null,
            deletedAt: realtyData.deletedAt != null && realtyData.deletedAt.isValid() ? realtyData.deletedAt.toJSON() : null
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
            res.body.forEach((realtyData: IRealtyData) => {
                realtyData.updatedAt = realtyData.updatedAt != null ? moment(realtyData.updatedAt) : null;
                realtyData.deletedAt = realtyData.deletedAt != null ? moment(realtyData.deletedAt) : null;
            });
        }
        return res;
    }
}

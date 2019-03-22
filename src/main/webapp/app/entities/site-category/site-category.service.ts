import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISiteCategory } from 'app/shared/model/site-category.model';

type EntityResponseType = HttpResponse<ISiteCategory>;
type EntityArrayResponseType = HttpResponse<ISiteCategory[]>;

@Injectable({ providedIn: 'root' })
export class SiteCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/site-categories';

    constructor(protected http: HttpClient) {}

    create(siteCategory: ISiteCategory): Observable<EntityResponseType> {
        return this.http.post<ISiteCategory>(this.resourceUrl, siteCategory, { observe: 'response' });
    }

    update(siteCategory: ISiteCategory): Observable<EntityResponseType> {
        return this.http.put<ISiteCategory>(this.resourceUrl, siteCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISiteCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISiteCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentContent } from 'app/shared/model/document-content.model';

type EntityResponseType = HttpResponse<IDocumentContent>;
type EntityArrayResponseType = HttpResponse<IDocumentContent[]>;

@Injectable({ providedIn: 'root' })
export class DocumentContentService {
    public resourceUrl = SERVER_API_URL + 'api/document-contents';

    constructor(protected http: HttpClient) {}

    create(documentContent: IDocumentContent): Observable<EntityResponseType> {
        return this.http.post<IDocumentContent>(this.resourceUrl, documentContent, { observe: 'response' });
    }

    update(documentContent: IDocumentContent): Observable<EntityResponseType> {
        return this.http.put<IDocumentContent>(this.resourceUrl, documentContent, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentContent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentContent[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

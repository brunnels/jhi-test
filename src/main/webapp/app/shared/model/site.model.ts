import { Moment } from 'moment';
import { IRealtyData } from 'app/shared/model/realty-data.model';
import { IDocument } from 'app/shared/model/document.model';
import { ISiteCategory } from 'app/shared/model/site-category.model';

export interface ISite {
    id?: number;
    siteContact?: string;
    updatedAt?: Moment;
    deletedAt?: Moment;
    realtyData?: IRealtyData;
    documents?: IDocument[];
    category?: ISiteCategory;
}

export class Site implements ISite {
    constructor(
        public id?: number,
        public siteContact?: string,
        public updatedAt?: Moment,
        public deletedAt?: Moment,
        public realtyData?: IRealtyData,
        public documents?: IDocument[],
        public category?: ISiteCategory
    ) {}
}

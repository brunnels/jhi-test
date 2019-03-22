import { IDocumentContent } from 'app/shared/model/document-content.model';
import { ISite } from 'app/shared/model/site.model';

export interface IDocument {
    id?: number;
    title?: string;
    size?: number;
    mimeType?: string;
    content?: IDocumentContent;
    site?: ISite;
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public title?: string,
        public size?: number,
        public mimeType?: string,
        public content?: IDocumentContent,
        public site?: ISite
    ) {}
}

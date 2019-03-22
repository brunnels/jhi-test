import { IDocument } from 'app/shared/model/document.model';

export interface IDocumentContent {
    id?: number;
    dataContentType?: string;
    data?: any;
    document?: IDocument;
}

export class DocumentContent implements IDocumentContent {
    constructor(public id?: number, public dataContentType?: string, public data?: any, public document?: IDocument) {}
}

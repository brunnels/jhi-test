export interface ISiteCategory {
    id?: number;
    name?: string;
}

export class SiteCategory implements ISiteCategory {
    constructor(public id?: number, public name?: string) {}
}

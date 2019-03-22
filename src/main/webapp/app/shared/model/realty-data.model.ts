import { Moment } from 'moment';
import { ISite } from 'app/shared/model/site.model';

export interface IRealtyData {
    id?: number;
    worldRegion?: string;
    region?: string;
    subregion?: string;
    deviceRegion?: string;
    country?: string;
    countryIso2?: string;
    countryIso3?: string;
    stateAbbrev?: string;
    stateFull?: string;
    city?: string;
    commonName?: string;
    address1?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    buildingStatus?: string;
    primaryUse?: string;
    capacity?: number;
    headcount?: number;
    occupied?: number;
    colocation?: string;
    facilityName?: string;
    buildingImagePath?: string;
    updatedAt?: Moment;
    deletedAt?: Moment;
    site?: ISite;
}

export class RealtyData implements IRealtyData {
    constructor(
        public id?: number,
        public worldRegion?: string,
        public region?: string,
        public subregion?: string,
        public deviceRegion?: string,
        public country?: string,
        public countryIso2?: string,
        public countryIso3?: string,
        public stateAbbrev?: string,
        public stateFull?: string,
        public city?: string,
        public commonName?: string,
        public address1?: string,
        public postalCode?: string,
        public latitude?: number,
        public longitude?: number,
        public buildingStatus?: string,
        public primaryUse?: string,
        public capacity?: number,
        public headcount?: number,
        public occupied?: number,
        public colocation?: string,
        public facilityName?: string,
        public buildingImagePath?: string,
        public updatedAt?: Moment,
        public deletedAt?: Moment,
        public site?: ISite
    ) {}
}

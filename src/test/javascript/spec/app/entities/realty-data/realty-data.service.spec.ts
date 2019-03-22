/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RealtyDataService } from 'app/entities/realty-data/realty-data.service';
import { IRealtyData, RealtyData } from 'app/shared/model/realty-data.model';

describe('Service Tests', () => {
    describe('RealtyData Service', () => {
        let injector: TestBed;
        let service: RealtyDataService;
        let httpMock: HttpTestingController;
        let elemDefault: IRealtyData;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RealtyDataService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new RealtyData(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                currentDate
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        updatedAt: currentDate.format(DATE_TIME_FORMAT),
                        deletedAt: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a RealtyData', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        updatedAt: currentDate.format(DATE_TIME_FORMAT),
                        deletedAt: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        updatedAt: currentDate,
                        deletedAt: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new RealtyData(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a RealtyData', async () => {
                const returnedFromService = Object.assign(
                    {
                        worldRegion: 'BBBBBB',
                        region: 'BBBBBB',
                        subregion: 'BBBBBB',
                        deviceRegion: 'BBBBBB',
                        country: 'BBBBBB',
                        countryIso2: 'BBBBBB',
                        countryIso3: 'BBBBBB',
                        stateAbbrev: 'BBBBBB',
                        stateFull: 'BBBBBB',
                        city: 'BBBBBB',
                        commonName: 'BBBBBB',
                        address1: 'BBBBBB',
                        postalCode: 'BBBBBB',
                        latitude: 1,
                        longitude: 1,
                        buildingStatus: 'BBBBBB',
                        primaryUse: 'BBBBBB',
                        capacity: 1,
                        headcount: 1,
                        occupied: 1,
                        colocation: 'BBBBBB',
                        facilityName: 'BBBBBB',
                        buildingImagePath: 'BBBBBB',
                        updatedAt: currentDate.format(DATE_TIME_FORMAT),
                        deletedAt: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        updatedAt: currentDate,
                        deletedAt: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of RealtyData', async () => {
                const returnedFromService = Object.assign(
                    {
                        worldRegion: 'BBBBBB',
                        region: 'BBBBBB',
                        subregion: 'BBBBBB',
                        deviceRegion: 'BBBBBB',
                        country: 'BBBBBB',
                        countryIso2: 'BBBBBB',
                        countryIso3: 'BBBBBB',
                        stateAbbrev: 'BBBBBB',
                        stateFull: 'BBBBBB',
                        city: 'BBBBBB',
                        commonName: 'BBBBBB',
                        address1: 'BBBBBB',
                        postalCode: 'BBBBBB',
                        latitude: 1,
                        longitude: 1,
                        buildingStatus: 'BBBBBB',
                        primaryUse: 'BBBBBB',
                        capacity: 1,
                        headcount: 1,
                        occupied: 1,
                        colocation: 'BBBBBB',
                        facilityName: 'BBBBBB',
                        buildingImagePath: 'BBBBBB',
                        updatedAt: currentDate.format(DATE_TIME_FORMAT),
                        deletedAt: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        updatedAt: currentDate,
                        deletedAt: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a RealtyData', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});

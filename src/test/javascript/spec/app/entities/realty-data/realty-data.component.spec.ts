/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestTestModule } from '../../../test.module';
import { RealtyDataComponent } from 'app/entities/realty-data/realty-data.component';
import { RealtyDataService } from 'app/entities/realty-data/realty-data.service';
import { RealtyData } from 'app/shared/model/realty-data.model';

describe('Component Tests', () => {
    describe('RealtyData Management Component', () => {
        let comp: RealtyDataComponent;
        let fixture: ComponentFixture<RealtyDataComponent>;
        let service: RealtyDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RealtyDataComponent],
                providers: []
            })
                .overrideTemplate(RealtyDataComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RealtyDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RealtyDataService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RealtyData(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.realtyData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

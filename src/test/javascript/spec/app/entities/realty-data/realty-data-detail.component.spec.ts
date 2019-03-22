/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { RealtyDataDetailComponent } from 'app/entities/realty-data/realty-data-detail.component';
import { RealtyData } from 'app/shared/model/realty-data.model';

describe('Component Tests', () => {
    describe('RealtyData Management Detail Component', () => {
        let comp: RealtyDataDetailComponent;
        let fixture: ComponentFixture<RealtyDataDetailComponent>;
        const route = ({ data: of({ realtyData: new RealtyData(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RealtyDataDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RealtyDataDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RealtyDataDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.realtyData).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

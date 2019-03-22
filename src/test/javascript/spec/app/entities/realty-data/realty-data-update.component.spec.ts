/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { RealtyDataUpdateComponent } from 'app/entities/realty-data/realty-data-update.component';
import { RealtyDataService } from 'app/entities/realty-data/realty-data.service';
import { RealtyData } from 'app/shared/model/realty-data.model';

describe('Component Tests', () => {
    describe('RealtyData Management Update Component', () => {
        let comp: RealtyDataUpdateComponent;
        let fixture: ComponentFixture<RealtyDataUpdateComponent>;
        let service: RealtyDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RealtyDataUpdateComponent]
            })
                .overrideTemplate(RealtyDataUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RealtyDataUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RealtyDataService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RealtyData(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.realtyData = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RealtyData();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.realtyData = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

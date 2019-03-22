/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestTestModule } from '../../../test.module';
import { RealtyDataDeleteDialogComponent } from 'app/entities/realty-data/realty-data-delete-dialog.component';
import { RealtyDataService } from 'app/entities/realty-data/realty-data.service';

describe('Component Tests', () => {
    describe('RealtyData Management Delete Component', () => {
        let comp: RealtyDataDeleteDialogComponent;
        let fixture: ComponentFixture<RealtyDataDeleteDialogComponent>;
        let service: RealtyDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RealtyDataDeleteDialogComponent]
            })
                .overrideTemplate(RealtyDataDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RealtyDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RealtyDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestTestModule } from '../../../test.module';
import { DocumentContentDeleteDialogComponent } from 'app/entities/document-content/document-content-delete-dialog.component';
import { DocumentContentService } from 'app/entities/document-content/document-content.service';

describe('Component Tests', () => {
    describe('DocumentContent Management Delete Component', () => {
        let comp: DocumentContentDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentContentDeleteDialogComponent>;
        let service: DocumentContentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [DocumentContentDeleteDialogComponent]
            })
                .overrideTemplate(DocumentContentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentContentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentContentService);
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

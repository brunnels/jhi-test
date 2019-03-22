/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestTestModule } from '../../../test.module';
import { SiteCategoryDeleteDialogComponent } from 'app/entities/site-category/site-category-delete-dialog.component';
import { SiteCategoryService } from 'app/entities/site-category/site-category.service';

describe('Component Tests', () => {
    describe('SiteCategory Management Delete Component', () => {
        let comp: SiteCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<SiteCategoryDeleteDialogComponent>;
        let service: SiteCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [SiteCategoryDeleteDialogComponent]
            })
                .overrideTemplate(SiteCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SiteCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteCategoryService);
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

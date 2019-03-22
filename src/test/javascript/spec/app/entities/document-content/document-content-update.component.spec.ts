/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { DocumentContentUpdateComponent } from 'app/entities/document-content/document-content-update.component';
import { DocumentContentService } from 'app/entities/document-content/document-content.service';
import { DocumentContent } from 'app/shared/model/document-content.model';

describe('Component Tests', () => {
    describe('DocumentContent Management Update Component', () => {
        let comp: DocumentContentUpdateComponent;
        let fixture: ComponentFixture<DocumentContentUpdateComponent>;
        let service: DocumentContentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [DocumentContentUpdateComponent]
            })
                .overrideTemplate(DocumentContentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentContentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentContentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentContent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentContent = entity;
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
                    const entity = new DocumentContent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentContent = entity;
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

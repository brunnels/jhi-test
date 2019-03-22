/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestTestModule } from '../../../test.module';
import { DocumentContentComponent } from 'app/entities/document-content/document-content.component';
import { DocumentContentService } from 'app/entities/document-content/document-content.service';
import { DocumentContent } from 'app/shared/model/document-content.model';

describe('Component Tests', () => {
    describe('DocumentContent Management Component', () => {
        let comp: DocumentContentComponent;
        let fixture: ComponentFixture<DocumentContentComponent>;
        let service: DocumentContentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [DocumentContentComponent],
                providers: []
            })
                .overrideTemplate(DocumentContentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentContentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentContentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DocumentContent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.documentContents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

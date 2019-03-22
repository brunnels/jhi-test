/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { DocumentContentDetailComponent } from 'app/entities/document-content/document-content-detail.component';
import { DocumentContent } from 'app/shared/model/document-content.model';

describe('Component Tests', () => {
    describe('DocumentContent Management Detail Component', () => {
        let comp: DocumentContentDetailComponent;
        let fixture: ComponentFixture<DocumentContentDetailComponent>;
        const route = ({ data: of({ documentContent: new DocumentContent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [DocumentContentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentContentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentContentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documentContent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

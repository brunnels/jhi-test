/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { SiteCategoryDetailComponent } from 'app/entities/site-category/site-category-detail.component';
import { SiteCategory } from 'app/shared/model/site-category.model';

describe('Component Tests', () => {
    describe('SiteCategory Management Detail Component', () => {
        let comp: SiteCategoryDetailComponent;
        let fixture: ComponentFixture<SiteCategoryDetailComponent>;
        const route = ({ data: of({ siteCategory: new SiteCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [SiteCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SiteCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SiteCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.siteCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestTestModule } from '../../../test.module';
import { SiteCategoryComponent } from 'app/entities/site-category/site-category.component';
import { SiteCategoryService } from 'app/entities/site-category/site-category.service';
import { SiteCategory } from 'app/shared/model/site-category.model';

describe('Component Tests', () => {
    describe('SiteCategory Management Component', () => {
        let comp: SiteCategoryComponent;
        let fixture: ComponentFixture<SiteCategoryComponent>;
        let service: SiteCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [SiteCategoryComponent],
                providers: []
            })
                .overrideTemplate(SiteCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SiteCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SiteCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.siteCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

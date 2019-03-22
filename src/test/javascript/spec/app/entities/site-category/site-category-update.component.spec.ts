/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { SiteCategoryUpdateComponent } from 'app/entities/site-category/site-category-update.component';
import { SiteCategoryService } from 'app/entities/site-category/site-category.service';
import { SiteCategory } from 'app/shared/model/site-category.model';

describe('Component Tests', () => {
    describe('SiteCategory Management Update Component', () => {
        let comp: SiteCategoryUpdateComponent;
        let fixture: ComponentFixture<SiteCategoryUpdateComponent>;
        let service: SiteCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [SiteCategoryUpdateComponent]
            })
                .overrideTemplate(SiteCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SiteCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteCategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SiteCategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.siteCategory = entity;
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
                    const entity = new SiteCategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.siteCategory = entity;
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

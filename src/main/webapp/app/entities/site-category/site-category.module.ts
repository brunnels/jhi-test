import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestSharedModule } from 'app/shared';
import {
    SiteCategoryComponent,
    SiteCategoryDetailComponent,
    SiteCategoryUpdateComponent,
    SiteCategoryDeletePopupComponent,
    SiteCategoryDeleteDialogComponent,
    siteCategoryRoute,
    siteCategoryPopupRoute
} from './';

const ENTITY_STATES = [...siteCategoryRoute, ...siteCategoryPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SiteCategoryComponent,
        SiteCategoryDetailComponent,
        SiteCategoryUpdateComponent,
        SiteCategoryDeleteDialogComponent,
        SiteCategoryDeletePopupComponent
    ],
    entryComponents: [
        SiteCategoryComponent,
        SiteCategoryUpdateComponent,
        SiteCategoryDeleteDialogComponent,
        SiteCategoryDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestSiteCategoryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

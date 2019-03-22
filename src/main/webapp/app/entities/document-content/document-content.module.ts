import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestSharedModule } from 'app/shared';
import {
    DocumentContentComponent,
    DocumentContentDetailComponent,
    DocumentContentUpdateComponent,
    DocumentContentDeletePopupComponent,
    DocumentContentDeleteDialogComponent,
    documentContentRoute,
    documentContentPopupRoute
} from './';

const ENTITY_STATES = [...documentContentRoute, ...documentContentPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentContentComponent,
        DocumentContentDetailComponent,
        DocumentContentUpdateComponent,
        DocumentContentDeleteDialogComponent,
        DocumentContentDeletePopupComponent
    ],
    entryComponents: [
        DocumentContentComponent,
        DocumentContentUpdateComponent,
        DocumentContentDeleteDialogComponent,
        DocumentContentDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestDocumentContentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

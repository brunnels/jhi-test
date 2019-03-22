import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestSharedModule } from 'app/shared';
import {
    RealtyDataComponent,
    RealtyDataDetailComponent,
    RealtyDataUpdateComponent,
    RealtyDataDeletePopupComponent,
    RealtyDataDeleteDialogComponent,
    realtyDataRoute,
    realtyDataPopupRoute
} from './';

const ENTITY_STATES = [...realtyDataRoute, ...realtyDataPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RealtyDataComponent,
        RealtyDataDetailComponent,
        RealtyDataUpdateComponent,
        RealtyDataDeleteDialogComponent,
        RealtyDataDeletePopupComponent
    ],
    entryComponents: [RealtyDataComponent, RealtyDataUpdateComponent, RealtyDataDeleteDialogComponent, RealtyDataDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestRealtyDataModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { TestSharedLibsModule, TestSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [TestSharedLibsModule, TestSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [TestSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestSharedModule {
    static forRoot() {
        return {
            ngModule: TestSharedModule
        };
    }
}

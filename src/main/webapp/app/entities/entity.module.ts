import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'document',
                loadChildren: './document/document.module#TestDocumentModule'
            },
            {
                path: 'document-content',
                loadChildren: './document-content/document-content.module#TestDocumentContentModule'
            },
            {
                path: 'site',
                loadChildren: './site/site.module#TestSiteModule'
            },
            {
                path: 'site-category',
                loadChildren: './site-category/site-category.module#TestSiteCategoryModule'
            },
            {
                path: 'realty-data',
                loadChildren: './realty-data/realty-data.module#TestRealtyDataModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestEntityModule {}

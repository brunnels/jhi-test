/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentContentComponentsPage, DocumentContentDeleteDialog, DocumentContentUpdatePage } from './document-content.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('DocumentContent e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let documentContentUpdatePage: DocumentContentUpdatePage;
    let documentContentComponentsPage: DocumentContentComponentsPage;
    /*let documentContentDeleteDialog: DocumentContentDeleteDialog;*/
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DocumentContents', async () => {
        await navBarPage.goToEntity('document-content');
        documentContentComponentsPage = new DocumentContentComponentsPage();
        await browser.wait(ec.visibilityOf(documentContentComponentsPage.title), 5000);
        expect(await documentContentComponentsPage.getTitle()).to.eq('testApp.documentContent.home.title');
    });

    it('should load create DocumentContent page', async () => {
        await documentContentComponentsPage.clickOnCreateButton();
        documentContentUpdatePage = new DocumentContentUpdatePage();
        expect(await documentContentUpdatePage.getPageTitle()).to.eq('testApp.documentContent.home.createOrEditLabel');
        await documentContentUpdatePage.cancel();
    });

    /* it('should create and save DocumentContents', async () => {
        const nbButtonsBeforeCreate = await documentContentComponentsPage.countDeleteButtons();

        await documentContentComponentsPage.clickOnCreateButton();
        await promise.all([
            documentContentUpdatePage.setDataInput(absolutePath),
        ]);
        expect(await documentContentUpdatePage.getDataInput()).to.endsWith(fileNameToUpload);
        await documentContentUpdatePage.save();
        expect(await documentContentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await documentContentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last DocumentContent', async () => {
        const nbButtonsBeforeDelete = await documentContentComponentsPage.countDeleteButtons();
        await documentContentComponentsPage.clickOnLastDeleteButton();

        documentContentDeleteDialog = new DocumentContentDeleteDialog();
        expect(await documentContentDeleteDialog.getDialogTitle())
            .to.eq('testApp.documentContent.delete.question');
        await documentContentDeleteDialog.clickOnConfirmButton();

        expect(await documentContentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

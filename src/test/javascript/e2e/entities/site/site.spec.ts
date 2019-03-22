/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SiteComponentsPage, SiteDeleteDialog, SiteUpdatePage } from './site.page-object';

const expect = chai.expect;

describe('Site e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let siteUpdatePage: SiteUpdatePage;
    let siteComponentsPage: SiteComponentsPage;
    let siteDeleteDialog: SiteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sites', async () => {
        await navBarPage.goToEntity('site');
        siteComponentsPage = new SiteComponentsPage();
        await browser.wait(ec.visibilityOf(siteComponentsPage.title), 5000);
        expect(await siteComponentsPage.getTitle()).to.eq('testApp.site.home.title');
    });

    it('should load create Site page', async () => {
        await siteComponentsPage.clickOnCreateButton();
        siteUpdatePage = new SiteUpdatePage();
        expect(await siteUpdatePage.getPageTitle()).to.eq('testApp.site.home.createOrEditLabel');
        await siteUpdatePage.cancel();
    });

    it('should create and save Sites', async () => {
        const nbButtonsBeforeCreate = await siteComponentsPage.countDeleteButtons();

        await siteComponentsPage.clickOnCreateButton();
        await promise.all([
            siteUpdatePage.setSiteContactInput('siteContact'),
            siteUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            siteUpdatePage.setDeletedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            siteUpdatePage.realtyDataSelectLastOption(),
            siteUpdatePage.categorySelectLastOption()
        ]);
        expect(await siteUpdatePage.getSiteContactInput()).to.eq('siteContact');
        expect(await siteUpdatePage.getUpdatedAtInput()).to.contain('2001-01-01T02:30');
        expect(await siteUpdatePage.getDeletedAtInput()).to.contain('2001-01-01T02:30');
        await siteUpdatePage.save();
        expect(await siteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await siteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Site', async () => {
        const nbButtonsBeforeDelete = await siteComponentsPage.countDeleteButtons();
        await siteComponentsPage.clickOnLastDeleteButton();

        siteDeleteDialog = new SiteDeleteDialog();
        expect(await siteDeleteDialog.getDialogTitle()).to.eq('testApp.site.delete.question');
        await siteDeleteDialog.clickOnConfirmButton();

        expect(await siteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

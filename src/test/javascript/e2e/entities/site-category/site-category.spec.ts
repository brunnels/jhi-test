/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SiteCategoryComponentsPage, SiteCategoryDeleteDialog, SiteCategoryUpdatePage } from './site-category.page-object';

const expect = chai.expect;

describe('SiteCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let siteCategoryUpdatePage: SiteCategoryUpdatePage;
    let siteCategoryComponentsPage: SiteCategoryComponentsPage;
    let siteCategoryDeleteDialog: SiteCategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SiteCategories', async () => {
        await navBarPage.goToEntity('site-category');
        siteCategoryComponentsPage = new SiteCategoryComponentsPage();
        await browser.wait(ec.visibilityOf(siteCategoryComponentsPage.title), 5000);
        expect(await siteCategoryComponentsPage.getTitle()).to.eq('testApp.siteCategory.home.title');
    });

    it('should load create SiteCategory page', async () => {
        await siteCategoryComponentsPage.clickOnCreateButton();
        siteCategoryUpdatePage = new SiteCategoryUpdatePage();
        expect(await siteCategoryUpdatePage.getPageTitle()).to.eq('testApp.siteCategory.home.createOrEditLabel');
        await siteCategoryUpdatePage.cancel();
    });

    it('should create and save SiteCategories', async () => {
        const nbButtonsBeforeCreate = await siteCategoryComponentsPage.countDeleteButtons();

        await siteCategoryComponentsPage.clickOnCreateButton();
        await promise.all([siteCategoryUpdatePage.setNameInput('name')]);
        expect(await siteCategoryUpdatePage.getNameInput()).to.eq('name');
        await siteCategoryUpdatePage.save();
        expect(await siteCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await siteCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SiteCategory', async () => {
        const nbButtonsBeforeDelete = await siteCategoryComponentsPage.countDeleteButtons();
        await siteCategoryComponentsPage.clickOnLastDeleteButton();

        siteCategoryDeleteDialog = new SiteCategoryDeleteDialog();
        expect(await siteCategoryDeleteDialog.getDialogTitle()).to.eq('testApp.siteCategory.delete.question');
        await siteCategoryDeleteDialog.clickOnConfirmButton();

        expect(await siteCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RealtyDataComponentsPage, RealtyDataDeleteDialog, RealtyDataUpdatePage } from './realty-data.page-object';

const expect = chai.expect;

describe('RealtyData e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let realtyDataUpdatePage: RealtyDataUpdatePage;
    let realtyDataComponentsPage: RealtyDataComponentsPage;
    /*let realtyDataDeleteDialog: RealtyDataDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load RealtyData', async () => {
        await navBarPage.goToEntity('realty-data');
        realtyDataComponentsPage = new RealtyDataComponentsPage();
        await browser.wait(ec.visibilityOf(realtyDataComponentsPage.title), 5000);
        expect(await realtyDataComponentsPage.getTitle()).to.eq('testApp.realtyData.home.title');
    });

    it('should load create RealtyData page', async () => {
        await realtyDataComponentsPage.clickOnCreateButton();
        realtyDataUpdatePage = new RealtyDataUpdatePage();
        expect(await realtyDataUpdatePage.getPageTitle()).to.eq('testApp.realtyData.home.createOrEditLabel');
        await realtyDataUpdatePage.cancel();
    });

    /* it('should create and save RealtyData', async () => {
        const nbButtonsBeforeCreate = await realtyDataComponentsPage.countDeleteButtons();

        await realtyDataComponentsPage.clickOnCreateButton();
        await promise.all([
            realtyDataUpdatePage.setWorldRegionInput('worldRegion'),
            realtyDataUpdatePage.setRegionInput('region'),
            realtyDataUpdatePage.setSubregionInput('subregion'),
            realtyDataUpdatePage.setDeviceRegionInput('deviceRegion'),
            realtyDataUpdatePage.setCountryInput('country'),
            realtyDataUpdatePage.setCountryIso2Input('countryIso2'),
            realtyDataUpdatePage.setCountryIso3Input('countryIso3'),
            realtyDataUpdatePage.setStateAbbrevInput('stateAbbrev'),
            realtyDataUpdatePage.setStateFullInput('stateFull'),
            realtyDataUpdatePage.setCityInput('city'),
            realtyDataUpdatePage.setCommonNameInput('commonName'),
            realtyDataUpdatePage.setAddress1Input('address1'),
            realtyDataUpdatePage.setPostalCodeInput('postalCode'),
            realtyDataUpdatePage.setLatitudeInput('5'),
            realtyDataUpdatePage.setLongitudeInput('5'),
            realtyDataUpdatePage.setBuildingStatusInput('buildingStatus'),
            realtyDataUpdatePage.setPrimaryUseInput('primaryUse'),
            realtyDataUpdatePage.setCapacityInput('5'),
            realtyDataUpdatePage.setHeadcountInput('5'),
            realtyDataUpdatePage.setOccupiedInput('5'),
            realtyDataUpdatePage.setColocationInput('colocation'),
            realtyDataUpdatePage.setFacilityNameInput('facilityName'),
            realtyDataUpdatePage.setBuildingImagePathInput('buildingImagePath'),
            realtyDataUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            realtyDataUpdatePage.setDeletedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
        ]);
        expect(await realtyDataUpdatePage.getWorldRegionInput()).to.eq('worldRegion');
        expect(await realtyDataUpdatePage.getRegionInput()).to.eq('region');
        expect(await realtyDataUpdatePage.getSubregionInput()).to.eq('subregion');
        expect(await realtyDataUpdatePage.getDeviceRegionInput()).to.eq('deviceRegion');
        expect(await realtyDataUpdatePage.getCountryInput()).to.eq('country');
        expect(await realtyDataUpdatePage.getCountryIso2Input()).to.eq('countryIso2');
        expect(await realtyDataUpdatePage.getCountryIso3Input()).to.eq('countryIso3');
        expect(await realtyDataUpdatePage.getStateAbbrevInput()).to.eq('stateAbbrev');
        expect(await realtyDataUpdatePage.getStateFullInput()).to.eq('stateFull');
        expect(await realtyDataUpdatePage.getCityInput()).to.eq('city');
        expect(await realtyDataUpdatePage.getCommonNameInput()).to.eq('commonName');
        expect(await realtyDataUpdatePage.getAddress1Input()).to.eq('address1');
        expect(await realtyDataUpdatePage.getPostalCodeInput()).to.eq('postalCode');
        expect(await realtyDataUpdatePage.getLatitudeInput()).to.eq('5');
        expect(await realtyDataUpdatePage.getLongitudeInput()).to.eq('5');
        expect(await realtyDataUpdatePage.getBuildingStatusInput()).to.eq('buildingStatus');
        expect(await realtyDataUpdatePage.getPrimaryUseInput()).to.eq('primaryUse');
        expect(await realtyDataUpdatePage.getCapacityInput()).to.eq('5');
        expect(await realtyDataUpdatePage.getHeadcountInput()).to.eq('5');
        expect(await realtyDataUpdatePage.getOccupiedInput()).to.eq('5');
        expect(await realtyDataUpdatePage.getColocationInput()).to.eq('colocation');
        expect(await realtyDataUpdatePage.getFacilityNameInput()).to.eq('facilityName');
        expect(await realtyDataUpdatePage.getBuildingImagePathInput()).to.eq('buildingImagePath');
        expect(await realtyDataUpdatePage.getUpdatedAtInput()).to.contain('2001-01-01T02:30');
        expect(await realtyDataUpdatePage.getDeletedAtInput()).to.contain('2001-01-01T02:30');
        await realtyDataUpdatePage.save();
        expect(await realtyDataUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await realtyDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last RealtyData', async () => {
        const nbButtonsBeforeDelete = await realtyDataComponentsPage.countDeleteButtons();
        await realtyDataComponentsPage.clickOnLastDeleteButton();

        realtyDataDeleteDialog = new RealtyDataDeleteDialog();
        expect(await realtyDataDeleteDialog.getDialogTitle())
            .to.eq('testApp.realtyData.delete.question');
        await realtyDataDeleteDialog.clickOnConfirmButton();

        expect(await realtyDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

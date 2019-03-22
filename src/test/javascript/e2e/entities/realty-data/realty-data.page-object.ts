import { element, by, ElementFinder } from 'protractor';

export class RealtyDataComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-realty-data div table .btn-danger'));
    title = element.all(by.css('jhi-realty-data div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RealtyDataUpdatePage {
    pageTitle = element(by.id('jhi-realty-data-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    worldRegionInput = element(by.id('field_worldRegion'));
    regionInput = element(by.id('field_region'));
    subregionInput = element(by.id('field_subregion'));
    deviceRegionInput = element(by.id('field_deviceRegion'));
    countryInput = element(by.id('field_country'));
    countryIso2Input = element(by.id('field_countryIso2'));
    countryIso3Input = element(by.id('field_countryIso3'));
    stateAbbrevInput = element(by.id('field_stateAbbrev'));
    stateFullInput = element(by.id('field_stateFull'));
    cityInput = element(by.id('field_city'));
    commonNameInput = element(by.id('field_commonName'));
    address1Input = element(by.id('field_address1'));
    postalCodeInput = element(by.id('field_postalCode'));
    latitudeInput = element(by.id('field_latitude'));
    longitudeInput = element(by.id('field_longitude'));
    buildingStatusInput = element(by.id('field_buildingStatus'));
    primaryUseInput = element(by.id('field_primaryUse'));
    capacityInput = element(by.id('field_capacity'));
    headcountInput = element(by.id('field_headcount'));
    occupiedInput = element(by.id('field_occupied'));
    colocationInput = element(by.id('field_colocation'));
    facilityNameInput = element(by.id('field_facilityName'));
    buildingImagePathInput = element(by.id('field_buildingImagePath'));
    updatedAtInput = element(by.id('field_updatedAt'));
    deletedAtInput = element(by.id('field_deletedAt'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setWorldRegionInput(worldRegion) {
        await this.worldRegionInput.sendKeys(worldRegion);
    }

    async getWorldRegionInput() {
        return this.worldRegionInput.getAttribute('value');
    }

    async setRegionInput(region) {
        await this.regionInput.sendKeys(region);
    }

    async getRegionInput() {
        return this.regionInput.getAttribute('value');
    }

    async setSubregionInput(subregion) {
        await this.subregionInput.sendKeys(subregion);
    }

    async getSubregionInput() {
        return this.subregionInput.getAttribute('value');
    }

    async setDeviceRegionInput(deviceRegion) {
        await this.deviceRegionInput.sendKeys(deviceRegion);
    }

    async getDeviceRegionInput() {
        return this.deviceRegionInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    async setCountryIso2Input(countryIso2) {
        await this.countryIso2Input.sendKeys(countryIso2);
    }

    async getCountryIso2Input() {
        return this.countryIso2Input.getAttribute('value');
    }

    async setCountryIso3Input(countryIso3) {
        await this.countryIso3Input.sendKeys(countryIso3);
    }

    async getCountryIso3Input() {
        return this.countryIso3Input.getAttribute('value');
    }

    async setStateAbbrevInput(stateAbbrev) {
        await this.stateAbbrevInput.sendKeys(stateAbbrev);
    }

    async getStateAbbrevInput() {
        return this.stateAbbrevInput.getAttribute('value');
    }

    async setStateFullInput(stateFull) {
        await this.stateFullInput.sendKeys(stateFull);
    }

    async getStateFullInput() {
        return this.stateFullInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setCommonNameInput(commonName) {
        await this.commonNameInput.sendKeys(commonName);
    }

    async getCommonNameInput() {
        return this.commonNameInput.getAttribute('value');
    }

    async setAddress1Input(address1) {
        await this.address1Input.sendKeys(address1);
    }

    async getAddress1Input() {
        return this.address1Input.getAttribute('value');
    }

    async setPostalCodeInput(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode);
    }

    async getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    async setLatitudeInput(latitude) {
        await this.latitudeInput.sendKeys(latitude);
    }

    async getLatitudeInput() {
        return this.latitudeInput.getAttribute('value');
    }

    async setLongitudeInput(longitude) {
        await this.longitudeInput.sendKeys(longitude);
    }

    async getLongitudeInput() {
        return this.longitudeInput.getAttribute('value');
    }

    async setBuildingStatusInput(buildingStatus) {
        await this.buildingStatusInput.sendKeys(buildingStatus);
    }

    async getBuildingStatusInput() {
        return this.buildingStatusInput.getAttribute('value');
    }

    async setPrimaryUseInput(primaryUse) {
        await this.primaryUseInput.sendKeys(primaryUse);
    }

    async getPrimaryUseInput() {
        return this.primaryUseInput.getAttribute('value');
    }

    async setCapacityInput(capacity) {
        await this.capacityInput.sendKeys(capacity);
    }

    async getCapacityInput() {
        return this.capacityInput.getAttribute('value');
    }

    async setHeadcountInput(headcount) {
        await this.headcountInput.sendKeys(headcount);
    }

    async getHeadcountInput() {
        return this.headcountInput.getAttribute('value');
    }

    async setOccupiedInput(occupied) {
        await this.occupiedInput.sendKeys(occupied);
    }

    async getOccupiedInput() {
        return this.occupiedInput.getAttribute('value');
    }

    async setColocationInput(colocation) {
        await this.colocationInput.sendKeys(colocation);
    }

    async getColocationInput() {
        return this.colocationInput.getAttribute('value');
    }

    async setFacilityNameInput(facilityName) {
        await this.facilityNameInput.sendKeys(facilityName);
    }

    async getFacilityNameInput() {
        return this.facilityNameInput.getAttribute('value');
    }

    async setBuildingImagePathInput(buildingImagePath) {
        await this.buildingImagePathInput.sendKeys(buildingImagePath);
    }

    async getBuildingImagePathInput() {
        return this.buildingImagePathInput.getAttribute('value');
    }

    async setUpdatedAtInput(updatedAt) {
        await this.updatedAtInput.sendKeys(updatedAt);
    }

    async getUpdatedAtInput() {
        return this.updatedAtInput.getAttribute('value');
    }

    async setDeletedAtInput(deletedAt) {
        await this.deletedAtInput.sendKeys(deletedAt);
    }

    async getDeletedAtInput() {
        return this.deletedAtInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class RealtyDataDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-realtyData-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-realtyData'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

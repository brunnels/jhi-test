import { element, by, ElementFinder } from 'protractor';

export class SiteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-site div table .btn-danger'));
    title = element.all(by.css('jhi-site div h2#page-heading span')).first();

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

export class SiteUpdatePage {
    pageTitle = element(by.id('jhi-site-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    siteContactInput = element(by.id('field_siteContact'));
    updatedAtInput = element(by.id('field_updatedAt'));
    deletedAtInput = element(by.id('field_deletedAt'));
    realtyDataSelect = element(by.id('field_realtyData'));
    categorySelect = element(by.id('field_category'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSiteContactInput(siteContact) {
        await this.siteContactInput.sendKeys(siteContact);
    }

    async getSiteContactInput() {
        return this.siteContactInput.getAttribute('value');
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

    async realtyDataSelectLastOption() {
        await this.realtyDataSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async realtyDataSelectOption(option) {
        await this.realtyDataSelect.sendKeys(option);
    }

    getRealtyDataSelect(): ElementFinder {
        return this.realtyDataSelect;
    }

    async getRealtyDataSelectedOption() {
        return this.realtyDataSelect.element(by.css('option:checked')).getText();
    }

    async categorySelectLastOption() {
        await this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async categorySelectOption(option) {
        await this.categorySelect.sendKeys(option);
    }

    getCategorySelect(): ElementFinder {
        return this.categorySelect;
    }

    async getCategorySelectedOption() {
        return this.categorySelect.element(by.css('option:checked')).getText();
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

export class SiteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-site-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-site'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

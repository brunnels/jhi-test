import { element, by, ElementFinder } from 'protractor';

export class DocumentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-document div table .btn-danger'));
    title = element.all(by.css('jhi-document div h2#page-heading span')).first();

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

export class DocumentUpdatePage {
    pageTitle = element(by.id('jhi-document-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    sizeInput = element(by.id('field_size'));
    mimeTypeInput = element(by.id('field_mimeType'));
    contentSelect = element(by.id('field_content'));
    siteSelect = element(by.id('field_site'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setSizeInput(size) {
        await this.sizeInput.sendKeys(size);
    }

    async getSizeInput() {
        return this.sizeInput.getAttribute('value');
    }

    async setMimeTypeInput(mimeType) {
        await this.mimeTypeInput.sendKeys(mimeType);
    }

    async getMimeTypeInput() {
        return this.mimeTypeInput.getAttribute('value');
    }

    async contentSelectLastOption() {
        await this.contentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async contentSelectOption(option) {
        await this.contentSelect.sendKeys(option);
    }

    getContentSelect(): ElementFinder {
        return this.contentSelect;
    }

    async getContentSelectedOption() {
        return this.contentSelect.element(by.css('option:checked')).getText();
    }

    async siteSelectLastOption() {
        await this.siteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async siteSelectOption(option) {
        await this.siteSelect.sendKeys(option);
    }

    getSiteSelect(): ElementFinder {
        return this.siteSelect;
    }

    async getSiteSelectedOption() {
        return this.siteSelect.element(by.css('option:checked')).getText();
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

export class DocumentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-document-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-document'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

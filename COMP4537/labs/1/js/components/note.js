class Note {
    _TEMPLATE_ID = "noteTemplate";
    _DELETE_BTN_CLASS = "delete-note-btn";
    _NOTE_CONTENT_CLASS = "note-content";
    _NOTE_CARD_CLASS = "note-card";

    constructor(content = "", onDelete) {
        this.content = content;
        this.element = this._createNoteElement();
        this.deleteButtonElement = this.element.querySelector(`.${this._DELETE_BTN_CLASS}`);

        this.contentElement = this.element.querySelector(`.${this._NOTE_CONTENT_CLASS}`);
        this.contentElementPlaceholder = LocalizationHelper.getTranslation("Labels.NotePlaceholder");
        this.contentElement.placeholder = this.contentElementPlaceholder;

        this.updateContent(this.content);

        this._registerDeleteButtonEventListener(onDelete);
    }

    updateContent(content) {
        this.content = content;
        this.contentElement.value = this.content;
    }

    setReadonly(readonly) {
        this.contentElement.disabled = readonly;
        this.deleteButtonElement.hidden = readonly;
        this.contentElement.placeholder = readonly ? "" : this.contentElementPlaceholder;
    }

    toJSON() {
        return {
            content: this.content
        };
    }

    listenForContentChange(onContentChange) {
        this._registerContentEventListener(onContentChange);
    }

    _createNoteElement() {
        const template = document.getElementById(this._TEMPLATE_ID);
        const clonedTemplate = template.content.cloneNode(true);

        // Ensure that the note card is the first child of the cloned template
        return clonedTemplate.querySelector(`.${this._NOTE_CARD_CLASS}`);
    }

    _registerDeleteButtonEventListener(onDelete) {
        this.deleteButtonElement.addEventListener(EventEnum.Click, () => {
            // Make sure that any provided function is called before the note is removed from the DOM
            onDelete(this);
            this._onDeleteBtnClick();
        });
    }

    _registerContentEventListener(onContentChange) {
        this.contentElement.addEventListener(EventEnum.Input, () => {
            // Make sure the note's content is updated before calling the provided function
            this._onContentChange();
            onContentChange(this);
        });
    }

    _onDeleteBtnClick() {
        this.element.remove();
    }

    _onContentChange() {
        this.content = this.contentElement.value;
    }
}
class Note {
    _templateId = "noteTemplate";
    _deleteButtonClass = "delete-note-btn";
    _noteContentClass = "note-content";

    constructor(content = "") {
        this.content = content;
        this.element = this._createNoteElement();
        this.deleteButtonElement = this.element.querySelector(`.${this._deleteButtonClass}`);
        this.contentElement = this.element.querySelector(`.${this._noteContentClass}`);

        this.updateContent(this.content);

        this._registerDeleteButtonEventListener();
        this._registerContentEventListener();
    }

    updateContent(content) {
        this.content = content;
        this.contentElement.value = this.content;
    }

    setReadonly(readonly) {
        this.contentElement.disabled = readonly;
        this.deleteButtonElement.hidden = readonly;
    }

    toJSON() {
        return {
            content: this.content
        };
    }

    _createNoteElement() {
        const template = document.getElementById(this._templateId);
        const clonedTemplate = template.content.cloneNode(true);

        // Ensure that the note card is the first child of the cloned template
        return clonedTemplate.querySelector(".note-card");
    }

    _registerDeleteButtonEventListener() {
        this.deleteButtonElement.addEventListener("click", this._onDeleteBtnClick.bind(this));
    }

    _registerContentEventListener() {
        this.contentElement.addEventListener("input", this._onContentChange.bind(this));
    }

    _onDeleteBtnClick() {
        this.element.remove();
    }

    _onContentChange() {
        this.content = this.contentElement.value;
    }
}
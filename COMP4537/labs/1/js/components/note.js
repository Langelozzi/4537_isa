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
    }

    updateContent(content) {
        this.content = content;
        this.contentElement.textContent = this.content;
    }

    setReadonly(readonly) {
        this.contentElement.contentEditable = !readonly;
        this.deleteButtonElement.hidden = readonly;
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

    _onDeleteBtnClick() {
        this.element.remove();
    }
}
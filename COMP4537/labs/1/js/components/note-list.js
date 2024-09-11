class NoteList {
    _templateId = "noteListTemplate";
    _noteContainerId = "notesContainer";

    constructor(notes, readonly = false) {
        if (!notes) {
            notes = [];
        }
        this.notes = notes;
        this.readonly = readonly;
        this.element = this._createNoteListElement();
        this.noteContainerElement = this.element.querySelector(`#${this._noteContainerId}`);

        this._displayNotes();

        if (this.readonly) {
            this._makeCardsReadOnly();
        }

        this._registerAddButtonEventListener();
    }

    add(note) {
        this.notes.push(note);
        this.noteContainerElement.appendChild(note.element);
    }

    remove(index) {
        this.notes.splice(index, 1);
    }

    toJSON() {
        return this.notes.map(note => note.toJSON());
    }

    // Private methods
    _createNoteListElement() {
        const template = document.getElementById(this._templateId);
        const noteList = template.content.cloneNode(true);
        return noteList;
    }

    _displayNotes() {
        // Clear the note container
        this.noteContainerElement.innerHTML = "";

        this.notes.forEach(note => {
            this.noteContainerElement.appendChild(note.element);
        });
    }

    _makeCardsReadOnly() {
        this.notes.forEach(note => {
            note.setReadonly(true);
        });
    }

    _registerAddButtonEventListener() {
        const addNoteButton = this.element.querySelector("#addNoteBtn");
        addNoteButton.addEventListener("click", this._onAddBtnClick.bind(this));
    }

    _onAddBtnClick() {
        const note = new Note();
        note.setReadonly(this.readonly);
        this.add(note);
    }
}
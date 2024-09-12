class NoteList {
    _templateId = "noteListTemplate";
    _noteContainerId = "notesContainer";
    _addNoteBtnId = "addNoteBtn";

    constructor(notes, readonly = false) {
        if (!notes) {
            notes = [];
        }
        this.notes = notes;
        this.readonly = readonly;
        this.element = this._createNoteListElement();
        this.noteContainerElement = this.element.querySelector(`#${this._noteContainerId}`);
        this.addNoteButton = this.element.querySelector(`#${this._addNoteBtnId}`);

        this._displayNotes();

        if (this.readonly) {
            this._makeCardsReadOnly();
            this.addNoteButton.hidden = true;
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

    fromJSON(json) {
        this.notes = json.map(note => {
            return new Note(note.content, this._onDeleteNote.bind(this));
        });
        this._displayNotes();

        if (this.readonly) {
            this._makeCardsReadOnly();
        }
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

    _onDeleteNote(note) {
        const index = this.notes.indexOf(note);
        this.remove(index);
    }

    _registerAddButtonEventListener() {
        const addNoteButton = this.element.getElementById(this._addNoteBtnId);
        addNoteButton.addEventListener("click", this._onAddBtnClick.bind(this));
    }

    _onAddBtnClick() {
        const note = new Note('', this._onDeleteNote.bind(this));
        note.setReadonly(this.readonly);
        this.add(note);
    }

}
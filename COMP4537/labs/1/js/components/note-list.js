class NoteList {
    _TEMPLATE_ID = "noteListTemplate";
    _NOTE_CONTAINER_ID = "notesContainer";
    _ADD_NOTE_BTN_ID = "addNoteBtn";

    constructor(notes, readonly = false) {
        if (!notes) {
            notes = [];
        }
        this.notes = notes;
        this.readonly = readonly;
        this.element = this._createNoteListElement();
        this.noteContainerElement = this.element.querySelector(`#${this._NOTE_CONTAINER_ID}`);
        this.addNoteButton = this.element.querySelector(`#${this._ADD_NOTE_BTN_ID}`);

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

    listenForContentChange(onContentChange) {
        this.notes.forEach(note => {
            note.listenForContentChange(onContentChange);
        });
    }

    toJSON() {
        return this.notes.map(note => note.toJSON());
    }

    fromJSON(json) {
        this.notes = json.map(note => {
            return this._createNote(note.content);
        });
        this._displayNotes();

        if (this.readonly) {
            this._makeCardsReadOnly();
        }
    }

    // Private methods
    _createNoteListElement() {
        const template = document.getElementById(this._TEMPLATE_ID);
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

    _onAddNote() {
        const note = this._createNote();
        this.add(note);
        ReadWriteHelper.writeNotes(this.toJSON());
    }

    _onDeleteNote(note) {
        const index = this.notes.indexOf(note);
        this.remove(index);
        ReadWriteHelper.writeNotes(this.toJSON());
    }

    _onChangeNoteContent() {
        ReadWriteHelper.writeNotes(this.toJSON());
    }

    _registerAddButtonEventListener() {
        const addNoteButton = this.element.getElementById(this._ADD_NOTE_BTN_ID);
        addNoteButton.addEventListener(EventEnum.Click, this._onAddNote.bind(this));
    }

    _createNote(content = '') {
        const note = new Note(content, this._onDeleteNote.bind(this));
        note.setReadonly(this.readonly);
        note.listenForContentChange(this._onChangeNoteContent.bind(this));
        return note
    }
}
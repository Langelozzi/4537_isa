class WriterManager extends Manager {
    static _NOTE_LIST_CONTAINER_ID = "noteListContainer";

    static init() {
        WriterManager._addEventListeners();
    }

    static _addEventListeners() {
        WriterManager._registerDocumentReadyListener();
        WriterManager._listenForDomChanges();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener(EventEnum.DOMContentLoaded, WriterManager._onDocumentReady);
    }

    // This allows for the localization of text to be updated when new elements are added to the DOM
    static _listenForDomChanges() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === MutationTypeEnum.ChildElements) {
                    WriterManager.localizeText();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    static _onDocumentReady() {
        const noteList = WriterManager._renderNoteList();
        const notes = ReadWriteHelper.readNotes();

        noteList.fromJSON(notes);

        WriterManager.localizeText();
    }

    static _renderNoteList() {
        const noteList = new NoteList();
        const noteListContainer = document.getElementById(this._NOTE_LIST_CONTAINER_ID);
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
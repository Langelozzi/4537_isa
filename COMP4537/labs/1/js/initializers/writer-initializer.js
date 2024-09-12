class WriterInitializer extends Initializer {
    static _NOTE_LIST_CONTAINER_ID = "noteListContainer";

    static init() {
        WriterInitializer._addEventListeners();
    }

    static _addEventListeners() {
        WriterInitializer._registerDocumentReadyListener();
        WriterInitializer._listenForDomChanges();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener(EventEnum.DOMContentLoaded, WriterInitializer._onDocumentReady);
    }

    // This allows for the localization of text to be updated when new elements are added to the DOM
    static _listenForDomChanges() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === MutationTypeEnum.ChildElements) {
                    WriterInitializer.localizeText();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    static _onDocumentReady() {
        const noteList = WriterInitializer._renderNoteList();
        const readWriteHelper = new ReadWriteHelper(noteList);

        readWriteHelper.loadStoredData();
        readWriteHelper.startWriteLoop();

        WriterInitializer.localizeText();
    }

    static _renderNoteList() {
        const noteList = new NoteList();
        const noteListContainer = document.getElementById(this._NOTE_LIST_CONTAINER_ID);
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
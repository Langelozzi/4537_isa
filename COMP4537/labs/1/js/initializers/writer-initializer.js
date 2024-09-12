class WriterInitializer extends Initializer {
    static init() {
        WriterInitializer._addEventListeners();
    }

    static _addEventListeners() {
        WriterInitializer._registerDocumentReadyListener();
        WriterInitializer._listenForDomChanges();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener("DOMContentLoaded", WriterInitializer._onDocumentReady);
    }

    // This allows for the localization of text to be updated when new elements are added to the DOM
    static _listenForDomChanges() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
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
        const noteListContainer = document.getElementById("noteListContainer");
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
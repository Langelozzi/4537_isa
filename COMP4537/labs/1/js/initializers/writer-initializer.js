class WriterInitializer extends Initializer {
    static init() {
        WriterInitializer._addEventListeners();
    }

    static _addEventListeners() {
        WriterInitializer._registerDocumentReadyListener();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener("DOMContentLoaded", WriterInitializer._onDocumentReady);
    }

    static _onDocumentReady() {
        WriterInitializer.localizeText();

        const noteList = WriterInitializer._renderNoteList();
        const readWriteHelper = new ReadWriteHelper(noteList);

        readWriteHelper.loadStoredData();
        readWriteHelper.startWriteLoop();
    }

    static _renderNoteList() {
        const noteList = new NoteList();
        const noteListContainer = document.getElementById("noteListContainer");
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
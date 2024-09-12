class ReaderInitializer extends Initializer {
    static init() {
        ReaderInitializer._addEventListeners();
    }

    static _addEventListeners() {
        ReaderInitializer._registerDocumentReadyListener();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener("DOMContentLoaded", ReaderInitializer._onDocumentReady);
    }

    static _onDocumentReady() {
        ReaderInitializer.localizeText();

        const noteList = ReaderInitializer._renderNoteList();
        const readWriteHelper = new ReadWriteHelper(noteList);

        readWriteHelper.loadStoredData();
        readWriteHelper.listenForWrite();
    }

    static _renderNoteList() {
        const noteList = new NoteList([], true);
        const noteListContainer = document.getElementById("noteListContainer");
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
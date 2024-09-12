class ReaderInitializer extends Initializer {
    static _NOTE_LIST_CONTAINER_ID = "noteListContainer";

    static init() {
        ReaderInitializer._addEventListeners();
    }

    static _addEventListeners() {
        ReaderInitializer._registerDocumentReadyListener();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener(EventEnum.DOMContentLoaded, ReaderInitializer._onDocumentReady);
    }

    static _onDocumentReady() {
        const noteList = ReaderInitializer._renderNoteList();
        const readWriteHelper = new ReadWriteHelper(noteList);

        readWriteHelper.loadStoredData();
        readWriteHelper.listenForWrite();

        ReaderInitializer.localizeText();
    }

    static _renderNoteList() {
        const noteList = new NoteList([], true);
        const noteListContainer = document.getElementById(ReaderInitializer._NOTE_LIST_CONTAINER_ID);
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
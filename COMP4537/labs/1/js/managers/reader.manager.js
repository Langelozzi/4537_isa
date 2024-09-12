class ReaderManager extends Manager {
    static _NOTE_LIST_CONTAINER_ID = "noteListContainer";

    static init() {
        ReaderManager._addEventListeners();
    }

    static _addEventListeners() {
        ReaderManager._registerDocumentReadyListener();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener(EventEnum.DOMContentLoaded, ReaderManager._onDocumentReady);
    }

    static _onDocumentReady() {
        const noteList = ReaderManager._renderNoteList();
        const readWriteHelper = new ReadWriteHelper(noteList);

        readWriteHelper.loadStoredData();
        readWriteHelper.listenForWrite();

        ReaderManager.localizeText();
    }

    static _renderNoteList() {
        const noteList = new NoteList([], true);
        const noteListContainer = document.getElementById(ReaderManager._NOTE_LIST_CONTAINER_ID);
        noteListContainer.appendChild(noteList.element);

        return noteList;
    }
}
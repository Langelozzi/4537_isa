class WriterInitializer extends Initializer {
    static init() {
        WriterInitializer.addEventListeners();
    }

    static addEventListeners() {
        WriterInitializer.registerDocumentReadyListener();
    }

    static registerDocumentReadyListener() {
        document.addEventListener("DOMContentLoaded", WriterInitializer._onDocumentReady);
    }

    static _onDocumentReady() {
        WriterInitializer.localizeText();

        const noteList = new NoteList();

        const noteListContainer = document.getElementById("noteListContainer");
        noteListContainer.appendChild(noteList.element);
    }
}
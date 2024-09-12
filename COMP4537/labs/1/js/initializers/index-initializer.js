class IndexInitializer extends Initializer {
    static init() {
        IndexInitializer._addEventListeners();
    }

    static _addEventListeners() {
        IndexInitializer._registerDocumentReadyListener();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener("DOMContentLoaded", IndexInitializer._onDocumentReady);
    }

    static _onDocumentReady() {
        IndexInitializer.localizeText();
    }
}
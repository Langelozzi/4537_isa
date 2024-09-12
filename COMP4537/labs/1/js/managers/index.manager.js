class IndexManager extends Manager {
    static init() {
        IndexManager._addEventListeners();
    }

    static _addEventListeners() {
        IndexManager._registerDocumentReadyListener();
    }

    static _registerDocumentReadyListener() {
        document.addEventListener(EventEnum.DOMContentLoaded, IndexManager._onDocumentReady);
    }

    static _onDocumentReady() {
        IndexManager.localizeText();
    }
}
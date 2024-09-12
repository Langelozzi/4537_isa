class ReadWriteHelper {
    // Private constant fields
    _NOTE_LIST_KEY = 'noteList';
    _LAST_SAVE_KEY = 'lastSave';
    _WRITE_INTERVAL_MS = 2000;
    _LAST_SAVE_ELEMENT_ID = 'saveTime';

    constructor(noteList) {
        this.noteList = noteList;

        this.lastSavedElement = document.getElementById(this._LAST_SAVE_ELEMENT_ID);
    }

    // Public methods
    startWriteLoop() {
        setInterval(() => {
            this._saveNotes();
            this._updateLastSaved();
        }, this._WRITE_INTERVAL_MS);
    }

    listenForWrite() {
        window.addEventListener(EventEnum.Storage, () => {
            this.loadStoredData();
        });
    }

    loadStoredData() {
        this._loadNotes();
        this._updateLastSaved();
    }

    // Private methods
    _saveNotes() {
        LocalStorageHelper.setItem(this._NOTE_LIST_KEY, this.noteList.toJSON());

        const lastSave = new Date().toLocaleTimeString();
        LocalStorageHelper.setItem(this._LAST_SAVE_KEY, lastSave);
    }

    _loadNotes() {
        this.noteList.fromJSON(LocalStorageHelper.getItem(this._NOTE_LIST_KEY));
    }

    _loadLastSaved() {
        return LocalStorageHelper.getItem(this._LAST_SAVE_KEY) ?? '';
    }

    _updateLastSaved() {
        this.lastSavedElement.innerHTML = this._loadLastSaved();
    }
}
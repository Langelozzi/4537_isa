class ReadWriteHelper {
    _noteListKey = 'noteList';
    _lastSaveKey = 'lastSave';
    _writeIntervalMS = 2000;
    _lastSaveElementId = 'saveTime';

    constructor(noteList) {
        this.noteList = noteList;
    }

    startWriteLoop() {
        setInterval(() => {
            this._saveNotes();
            this._updateLastSaved();
        }, this._writeIntervalMS);
    }

    listenForWrite() {
        window.addEventListener('storage', () => {
            this.loadStoredData();
        });
    }

    loadStoredData() {
        this._loadNotes();
        this._updateLastSaved();
    }

    _saveNotes() {
        LocalStorageHelper.setItem(this._noteListKey, this.noteList.toJSON());

        const lastSave = new Date().toLocaleTimeString();
        LocalStorageHelper.setItem(this._lastSaveKey, lastSave);
    }

    _loadNotes() {
        this.noteList.fromJSON(LocalStorageHelper.getItem(this._noteListKey));
    }

    _loadLastSaved() {
        return LocalStorageHelper.getItem(this._lastSaveKey);
    }

    _updateLastSaved() {
        const lastSavedElement = document.getElementById(this._lastSaveElementId);
        lastSavedElement.textContent = this._loadLastSaved();
    }
}
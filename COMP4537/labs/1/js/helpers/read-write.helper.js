class ReadWriteHelper {
    _noteListKey = 'noteList';
    _lastSaveKey = 'lastSave';
    _saveIntervalMS = 2000;
    _lastSaveElementId = 'saveTime';

    constructor(noteList) {
        this.noteList = noteList;
    }

    startSaveLoop() {
        setInterval(() => {
            this._saveNotes();
            this._updateLastSaved();
        }, this._saveIntervalMS);
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
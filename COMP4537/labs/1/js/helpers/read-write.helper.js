class ReadWriteHelper {
    _noteListKey = 'noteList';

    constructor(noteList) {
        this.noteList = noteList;
    }

    startSaveLoop() {
        setInterval(() => {
            this._saveNotes();
        }, 3000);
    }

    _saveNotes() {
        LocalStorageHelper.setItem(this._noteListKey, this.noteList.toJSON());
    }

    _loadNotes() {
        this.noteList.fromJSON(LocalStorageHelper.getItem(this._noteListKey));
    }
}
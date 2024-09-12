class ReadWriteHelper {
    // Private constant fields
    static _NOTE_LIST_KEY = 'noteList';
    static _LAST_SAVE_KEY = 'lastSave';
    static _WRITE_INTERVAL_MS = 2000;
    static _LAST_SAVE_ELEMENT_ID = 'saveTime';

    // Public methods
    static listenForStorageChanges(onChange) {
        window.addEventListener(EventEnum.Storage, onChange);
    }

    static readNotes() {
        ReadWriteHelper._updateLastSaved();
        return ReadWriteHelper._loadNotes();
    }

    static writeNotes(notes) {
        ReadWriteHelper._saveNotes(notes);
        ReadWriteHelper._updateLastSaved();
    }

    // Private methods
    static _saveNotes(notes) {
        LocalStorageHelper.setItem(ReadWriteHelper._NOTE_LIST_KEY, notes);

        const lastSave = new Date().toLocaleTimeString();
        LocalStorageHelper.setItem(ReadWriteHelper._LAST_SAVE_KEY, lastSave);
    }

    static _loadNotes() {
        return LocalStorageHelper.getItem(ReadWriteHelper._NOTE_LIST_KEY) ?? [];
    }

    static _loadLastSaved() {
        return LocalStorageHelper.getItem(ReadWriteHelper._LAST_SAVE_KEY) ?? '';
    }

    static _updateLastSaved() {
        document.getElementById(ReadWriteHelper._LAST_SAVE_ELEMENT_ID).innerHTML = ReadWriteHelper._loadLastSaved();
    }
}
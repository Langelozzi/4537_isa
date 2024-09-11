class LocalizationHelper {
    static _localizationAttribute = "data-i18n";

    // Public methods
    static localizeElements() {
        const elements = document.querySelectorAll(`[${this._localizationAttribute}]`);
        elements.forEach(element => {
            const path = element.getAttribute(this._localizationAttribute);
            const localizedString = this.getLocalizedString(path);

            if (localizedString) {
                element.textContent = localizedString;
            } else {
                console.error(`No localization found for path: ${path}`);
            }
        });
    }

    static getLocalizedString(key) {
        return key.split('.').reduce((obj, key) => obj && obj[key], Dictionary);
    }
}
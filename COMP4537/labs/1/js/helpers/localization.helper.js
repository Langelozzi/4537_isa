class LocalizationHelper {
    static _localizationAttribute = "data-i18n";

    // Public methods
    static localizeElements() {
        const elements = document.querySelectorAll(`[${this._localizationAttribute}]`);
        elements.forEach(element => {
            const path = element.getAttribute(this._localizationAttribute);
            const localizedString = this.getTranslation(path);

            if (localizedString) {
                element.textContent = localizedString;
            } else {
                const errorMsg = LocalizationHelper.getTranslation("ErrorMessages.LocalizationNotFound");
                console.error(`${errorMsg} ${path}`);
            }
        });
    }

    static getTranslation(key) {
        // Starts at the Dictionary level and drills down to the desired key until obj is the value of the key
        return key.split('.').reduce((obj, key) => obj && obj[key], Dictionary);
    }
}
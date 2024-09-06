class Initializer {
    constructor() {
        this.game;
    }

    // Public methods
    onDocumentLoad() {
        this._setLabels();
        this._registerInputEventListeners();
        this._registerButtonEventListeners();
    }

    // Private methods
    _setLabels() {
        // Initialize document title
        document.title = Dictionary.Labels.WindowTitle;

        // Initialize dynamic labels
        const inputLabelElement = document.getElementById('inputLabel');
        inputLabelElement.innerText = Dictionary.Labels.ButtonCountInput;

        const goBtnElement = document.getElementById('goBtn');
        goBtnElement.innerText = Dictionary.Labels.GoButton;
    }

    _registerInputEventListeners() {
        document.getElementById('boxCountInput').addEventListener('keyup', function (event) {
            // Validate that the input is between 3 and 7
            const input = event.target;
            const value = parseInt(input.value);
            const submitBtn = document.getElementById('goBtn');
            const errorMessage = document.getElementById('errorMessage');

            if (value >= 3 && value <= 7) {
                submitBtn.removeAttribute('disabled');
                errorMessage.style.display = 'none';
            } else {
                submitBtn.setAttribute('disabled', true);
                errorMessage.style.display = 'block';
                errorMessage.innerText = Dictionary.ErrorMessages.InvalidButtonNumberMessage;
            }
        })
    }

    _registerButtonEventListeners() {
        document.getElementById('goBtn').addEventListener('click', function () {
            const input = document.getElementById('boxCountInput');
            const count = parseInt(input.value);

            if (this.game) {
                this.game.destroy();
            }

            if (count) {
                const overlay = new Overlay();
                this.game = new Game(count, overlay);
                this.game.start();
            }
        });
    }
}
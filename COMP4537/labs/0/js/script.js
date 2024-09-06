// Global variables
let game;


// Initialization code
(function () {
    // Initialize document title
    document.title = Dictionary.Labels.WindowTitle;

    // Initialize dynamic labels
    const inputLabelElement = document.getElementById('inputLabel');
    inputLabelElement.innerText = Dictionary.Labels.ButtonCountInput;

    const goBtnElement = document.getElementById('goBtn');
    goBtnElement.innerText = Dictionary.Labels.GoButton;
})();


// Event listeners
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

document.getElementById('goBtn').addEventListener('click', function () {
    const input = document.getElementById('boxCountInput');
    const count = parseInt(input.value);

    if (game) {
        game.destroy();
    }

    if (count) {
        const overlay = new Overlay();
        game = new Game(count, overlay);
        game.start();
    }
});
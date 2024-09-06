class Overlay {
    constructor() {
        this.overlay = document.querySelector('.overlay');
        this.overlayContent = document.querySelector('.overlay-content');
    }

    show(message) {
        // Clear previous content
        this.overlayContent.innerHTML = '';

        const h2 = document.createElement('h2');
        h2.innerText = message;
        this.overlayContent.appendChild(h2);

        this.overlay.style.display = 'flex';
    }

    hide() {
        this.overlay.style.display = 'none';
    }
}
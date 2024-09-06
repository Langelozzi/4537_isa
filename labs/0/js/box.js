class Box {
    constructor(color, width, height, top, left, order) {
        this.order = order;
        this.canClick = false;

        this.btn = document.createElement('button');
        this.btn.classList.add('box');
        this.btn.style.backgroundColor = color;
        this.btn.style.width = width;
        this.btn.style.height = height;

        this._addLabel(this.order);

        const parent = document.getElementById('boxes');
        this._render(parent);

        if (top && left) {
            this.setLocation(top, left);
        }
    }

    // Public methods
    hideLabel() {
        this.btn.querySelector('p').style.display = 'none';
    }

    showLabel() {
        this.btn.querySelector('p').style.display = 'block';
    }

    registerClickEvent(callback) {
        this.btn.addEventListener('click', (e) => {
            if (this.canClick) {
                callback(this, e);
            }
        });
    }

    enableClick() {
        this.canClick = true;
    }

    disableClick() {
        this.canClick = false;
    }

    setLocation(top, left) {
        this.btn.style.position = 'absolute';
        this.btn.style.top = top;
        this.btn.style.left = left;
    }

    // Private methods
    _addLabel(label) {
        const p = document.createElement('p');
        p.innerText = label;
        this.btn.appendChild(p);
    }

    _render(parent) {
        if (parent) {
            parent.appendChild(this.btn);
        } else {
            document.body.appendChild(this.btn);
        }
    }
}
const colorsAmount = 10;
const colorsContainer = document.querySelector('.colors');

/**
 * Uses a generator function and displays colorsAmount random colors.
 */
function generateDisplay() {
    colorsContainer.innerHTML = '';
    let html = '';
    for (let i = 0; i < colorsAmount; i++) {
        const color = generateColor();
        html += `
        <div class="color-item" style="background-color: ${color};" onclick="copy(this, '${color}')">
                <div>
                    <span class="text">${color}</span>
                    <i class="fas fa-copy"></i>
                    <i class="fas fa-check"></i>
                </div>
            </div>
        `;
    }
    colorsContainer.innerHTML = html;
}

/**
 * 
 * @param {HTMLDivElement} element -> the element that got clicked on (.color-item)
 * @param {string} color -> the color that got copied.
 * copies the color.
 */
function copy(element, color) {
    if (element.timeOut) return;
    navigator.clipboard.writeText(color).then(() => {
        addClass(element, 'copying');
        element.timeOut = setTimeout(() => {
            removeClass(element, 'copying');
            element.timeOut = undefined;
        }, 2000);
    });
}
/**
 * 
 * @returns a generated hex color.
 */
function generateColor() {
    const parts = '0123456789aAbBcCdDeEfF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * parts.length);
        color += parts[randomIndex];
    }
    return color;
}


const generateButton = document.querySelector('.generate-palette');
generateButton.addEventListener('click', () => {
    generateDisplay();
});

/**
 * 
 * @param {*} element 
 * @param {string} className 
 * adds the class className to the element
 */
function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

/**
 * 
 * @param {*} element 
 * @param {string} className 
 * removes the class className from the element
 */
function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

generateDisplay();
class tabObject {
    counter: number;
    constructor(counter: number) {
        this.counter = counter;
    }

    createTab() {
        return `
        <div class="tab" id="tab-${tabCounter}">
            <label for="tab-${tabCounter}">to-do ${tabCounter}</label
            ><input type="text" name="tab-${tabCounter}" id="tab-text-${tabCounter}"/>
        </div>
    `;
    }

    appendToDOM(container: Element) {
        container.insertAdjacentHTML('beforeend', this.createTab());
    }
}

let tabCounter = 0; // Initialize counter

export default function addNewTab() {
    const container = document.querySelector('#tabholder');
    const newTab = new tabObject(tabCounter++);
    newTab.appendToDOM(container);
    console.log('newTab');
}

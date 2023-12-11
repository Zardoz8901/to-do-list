class tabObject {
    counter: number;
    constructor(counter: number) {
        this.counter = counter;
    }

    createTab() {
        return `
        <div class="tab" id="tab-${tabCounter}">
            <label class="visually-hidden" for="tab-${tabCounter}">Tab</label
            ><input type="text" name="tab-${tabCounter}" id="tab-text-${tabCounter}" placeholder="tab ${tabCounter}"/>
        </div>
    `;
    }

    appendToDOM(container: Element) {
        container.insertAdjacentHTML('beforeend', this.createTab());
    }
}

let tabCounter = 1; // Initialize counter

export default function addNewTab() {
    const container = document.querySelector('#tabholder');
    const newTab = new tabObject(tabCounter++);
    newTab.appendToDOM(container);
    console.log('newTab');
}

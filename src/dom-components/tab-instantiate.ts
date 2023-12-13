import limiter from './object-limiter';
import addNewTab from './tab-object';

export default function instantiateTab() {
    const newTabButton = document.querySelector('#new-tab');

    newTabButton.addEventListener('click', () => {
        limiter('.tab', 10, addNewTab);
    });
}

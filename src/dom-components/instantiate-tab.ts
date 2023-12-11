import instantiateTabLimit from './limit-tabs';

export default function instantiateTab() {
    const newTabButton = document.querySelector('#new-tab');

    newTabButton.addEventListener('click', () => {
        instantiateTabLimit();
    });
}

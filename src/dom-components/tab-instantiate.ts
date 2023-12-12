import instantiateTabLimit from './tabs-limiter';

export default function instantiateTab() {
    const newTabButton = document.querySelector('#new-tab');

    newTabButton.addEventListener('click', () => {
        instantiateTabLimit();
    });
}

import addNewTab from './tab-object';

export default function instantiateTabLimit() {
    const tabs = document.querySelectorAll('.tab');

    if (tabs.length < 10) {
        addNewTab();
    }
}

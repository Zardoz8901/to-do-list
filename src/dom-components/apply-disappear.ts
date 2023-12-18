export default function applyDisappear(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('disappear');
    } else {
        console.error(`Element with selector ${selector} not found.`);
    }
}
// broaden class to include apple and remove hide/disappear

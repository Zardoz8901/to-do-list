export default function applyDisappear(query: string, value: number) {
    const newToDo = document.querySelector(query + value);
    if (value > 1) {
        newToDo.classList.add('disappear');
    }
}

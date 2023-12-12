export default function applyDisappear(value: number) {
    const newToDo = document.querySelector(`#new-to-do-${value}`);
    if (value > 1) {
        newToDo.classList.add('disappear');
    }
}

import limiter from './object-limiter';
import addNewToDoRow from './to-do-row';

export default function instantiateToDo() {
    const toDoButton = document.querySelector('#new-to-do-1');

    toDoButton.addEventListener('click', () => {
        limiter('.to-do-row', 18, addNewToDoRow);
    });
}

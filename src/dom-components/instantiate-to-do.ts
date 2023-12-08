import instantiateDatePicker from './instantiate-date-picker';
import prioritySlider from '../dom-components/priority-slider';
import addNewToDoRow from './to-do-row';

export default function instantiateToDo() {
    const toDoButton = document.querySelector('#new-to-do-1');

    toDoButton.addEventListener('click', () => {
        console.log('instantiate');
        addNewToDoRow();
        prioritySlider();
        instantiateDatePicker();
    });
}

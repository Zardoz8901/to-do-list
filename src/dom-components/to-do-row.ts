import applyDisappear from './apply-disappear';
import instantiateDatePicker from './instantiate-date-picker';
import prioritySlider from './priority-slider';

class ToDoRow {
    counter: number;
    constructor(counter: number) {
        this.counter = counter;
    }

    createRowHTML() {
        return `
            <div class="to-do-row" id="to-do-${toDoCounter}">
                <button id="new-to-do-${toDoCounter}" class="new-to-do"></button>
                <div class="complete-task to-do-cell">
                    <input type="checkbox" id="check-${toDoCounter}" name="check-${toDoCounter}" />
                    <label for="check-${toDoCounter}"></label>
                </div>
                <div class="title to-do-cell">
                    <label class="visually-hidden" for="title-${toDoCounter}">Title</label>
                    <input type="text" name="title-${toDoCounter}" id="title-${toDoCounter}" />
                </div>
                <div class="description to-do-cell">
                    <label class="visually-hidden" for="description-${toDoCounter}">Description</label>
                    <input type="text" name="description-${toDoCounter}" id="description-${toDoCounter}" />
                </div>
                <div id="date-picker-${toDoCounter}" class="date-picker to-do-cell">
                    <input class="flatpickr" type="text" placeholder="add time" />
                </div>
                <div class="priority-slider to-do-cell" id="priority-container-${toDoCounter}">
                    <div class="priority-boxes">
                        <div class="box" data-priority="1"></div>
                        <div class="box" data-priority="2"></div>
                        <div class="box" data-priority="3"></div>
                        <div class="box" data-priority="4"></div>
                        <div class="box" data-priority="5"></div>
                            <input
                                type="range"
                                class="priority-input"
                                id="priority-slider-${toDoCounter}"
                                min="0"
                                max="5"
                                value="0"
                            />
                        </div>
                </div>
                <div class="timestamp to-do-cell" id="timestamp-${toDoCounter}"></div>
            </div>
    `;
    }

    appendToDOM(container: Element) {
        container.insertAdjacentHTML('beforeend', this.createRowHTML());
    }
}

let toDoCounter = 0; // Initialize counter

export default function addNewToDoRow() {
    const container = document.querySelector('.to-do.table');
    const newToDoRow = new ToDoRow(toDoCounter++);
    newToDoRow.appendToDOM(container);
    applyDisappear('#new-to-do-', toDoCounter);
    instantiateDatePicker();
    prioritySlider();
}

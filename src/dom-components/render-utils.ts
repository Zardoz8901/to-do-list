import Project from './project-class';
import Tab from './tab-class';
import ToDo from './to-do-class';
import applyDisappear from './apply-disappear';
import instantiateDatePicker from './instantiate-date-picker';
import prioritySlider from './priority-slider';

export default class RenderUtils {
    static renderProject(project: Project) {
        const container = document.querySelector('#project-container');
        const projectHTML = `
            <div class="arrow-down" id="new-project-${project.id}"></div>
            <div class="project" id="project-${project.id}">
                project-${project.id}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', projectHTML);
        applyDisappear(`#new-project-`, project.id);
    }

    static renderTab(tab: Tab) {
        const container = document.querySelector('#tabholder');
        const tabHTML = `
            <div class="tab" id="tab-${tab.id}">
                <label for="tab-${tab.id}">to-do ${tab.id}</label
                ><input type="text" name="tab-${tab.id}" id="tab-text-${tab.id}"/>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', tabHTML);
    }

    static renderToDo(todo: ToDo) {
        console.log(`Rendering ToDo ID: ${todo.id}`); // Debugging log
        const container = document.querySelector('.to-do.table');
        if (container) {
            console.log(`Container found for ToDo ID: ${todo.id}, appending...`); // Debugging log

            const toDoHTML = `
            <div class="to-do-row" id="to-do-${todo.id}">
                <button id="new-to-do-${todo.id}" class="new-to-do"></button>
                <div class="complete-task to-do-cell">
                    <input type="checkbox" id="check-${todo.id}" name="check-${todo.id}" />
                    <label for="check-${todo.id}"></label>
                </div>
                <div class="title to-do-cell">
                    <label class="visually-hidden" for="title-${todo.id}">Title</label>
                    <input type="text" name="title-${todo.id}" id="title-${todo.id}" />
                </div>
                <div class="description to-do-cell">
                    <label class="visually-hidden" for="description-${todo.id}">Description</label>
                    <input type="text" name="description-${todo.id}" id="description-${todo.id}" />
                </div>
                <div id="date-picker-${todo.id}" class="date-picker to-do-cell">
                    <input class="flatpickr" type="text" placeholder="add time" />
                </div>
                <div class="priority-slider to-do-cell" id="priority-container-${todo.id}">
                    <div class="priority-boxes">
                        <div class="box" data-priority="1"></div>
                        <div class="box" data-priority="2"></div>
                        <div class="box" data-priority="3"></div>
                        <div class="box" data-priority="4"></div>
                        <div class="box" data-priority="5"></div>
                            <input
                                type="range"
                                class="priority-input"
                                id="priority-slider-${todo.id}"
                                min="0"
                                max="5"
                                value="0"
                            />
                        </div>
                </div>
                <div class="timestamp to-do-cell" id="timestamp-${todo.id}"></div>
            </div>
    `;
            container.insertAdjacentHTML('beforeend', toDoHTML);
            applyDisappear(`#new-to-do-`, todo.id);
            instantiateDatePicker(todo.id);
            prioritySlider();
        } else {
            console.error('Container for to-dos not found.'); // Error message if container is not found
        }
    }
}

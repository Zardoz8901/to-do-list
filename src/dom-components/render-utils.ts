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
        if (project.id > 1) {
            // This checks to avoid applying to the first project
            applyDisappear(`#new-project-${project.id}`);
        }
    }

    static renderTab(tab: Tab, project: Project) {
        const container = document.querySelector('#tabholder');
        const tabHTML = `
            <div class="tab" id="project-${project.id}-tab-${tab.id}">
                to-do ${tab.id}    
            </div>
        `;
        container.insertAdjacentHTML('beforeend', tabHTML);
    }

    static renderToDo(todo: ToDo, tab: Tab, project: Project) {
        console.log(`Rendering ToDo ID: ${todo.id}`); // Debugging log
        const container = document.querySelector('.to-do.table');
        if (container) {
            console.log(`Container found for ToDo ID: ${todo.id}, appending...`); // Debugging log

            const toDoHTML = `
            <div class="to-do-row" id="to-do-project-${project.id}-tab-${tab.id}-todo-${todo.id}">
                <button id="new-to-do-${project.id}-tab-${tab.id}-todo-${todo.id}" class="new-to-do"></button>
                <div class="complete-task to-do-cell">
                    <input type="checkbox" id="check-project-${project.id}-tab-${tab.id}-todo-${todo.id}" name="check-project-${project.id}-tab-${tab.id}-todo-${todo.id}" />
                    <label for="check-project-${project.id}-tab-${tab.id}-todo-${todo.id}"></label>
                </div>
                <div class="title to-do-cell">
                    <label class="visually-hidden" for="title-project-${project.id}-tab-${tab.id}-todo-${todo.id}">Title</label>
                    <input type="text" name="title-project-${project.id}-tab-${tab.id}-todo-${todo.id}" id="title-project-${project.id}-tab-${tab.id}-todo-${todo.id}" />
                </div>
                <div class="description to-do-cell">
                    <label class="visually-hidden" for="description-project-${project.id}-tab-${tab.id}-todo-${todo.id}">Description</label>
                    <input type="text" name="description-project-${project.id}-tab-${tab.id}-todo-${todo.id}" id="description-project-${project.id}-tab-${tab.id}-todo-${todo.id}" />
                </div>
                <div id="date-picker-project-${project.id}-tab-${tab.id}-todo-${todo.id}" class="date-picker to-do-cell">
                    <input class="flatpickr" type="text" placeholder="add time" />
                </div>
                <div class="priority-slider to-do-cell" id="priority-container-project-${project.id}-tab-${tab.id}-todo-${todo.id}">
                    <div class="priority-boxes">
                        <div class="box" data-priority="1"></div>
                        <div class="box" data-priority="2"></div>
                        <div class="box" data-priority="3"></div>
                        <div class="box" data-priority="4"></div>
                        <div class="box" data-priority="5"></div>
                            <input
                                type="range"
                                class="priority-input"
                                id="priority-slider-project-${project.id}-tab-${tab.id}-todo-${todo.id}"
                                min="0"
                                max="5"
                                value="0"
                            />
                        </div>
                </div>
                <div class="timestamp to-do-cell" id="timestamp-project-${project.id}-tab-${tab.id}-todo-${todo.id}"></div>
            </div>
    `;
            container.insertAdjacentHTML('beforeend', toDoHTML);
            if (todo.id > 1) {
                // This checks to avoid applying to the first to-do of each tab
                applyDisappear(`#new-to-do-${project.id}-tab-${tab.id}-todo-${todo.id}`);
            }
            instantiateDatePicker(project.id, tab.id, todo.id);
            prioritySlider();
        } else {
            console.error('Container for to-dos not found.'); // Error message if container is not found
        }
    }
}

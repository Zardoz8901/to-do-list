import applyDisappear from './apply-disappear';

class projectObject {
    counter: number;
    constructor(counter: number) {
        this.counter = counter;
    }

    createProject() {
        return `
        <div class="arrow-down" id="new-project-${projectCounter}"></div>
        <div class="project" id="project-${projectCounter}">
                        project ${projectCounter}
                    </div> 
    `;
    }

    appendToDOM(container: Element) {
        container.insertAdjacentHTML('beforeend', this.createProject());
    }
}

let projectCounter = 0; // Initialize counter

export default function addNewProject() {
    const container = document.querySelector('#project-container');
    const newProject = new projectObject(projectCounter++);
    newProject.appendToDOM(container);
    applyDisappear('#new-project-', projectCounter);
}

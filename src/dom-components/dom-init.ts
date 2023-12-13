// import instantiateProject from './project-instantiate';
// import addNewProject from './project-object';
// import instantiateTab from './tab-instantiate';
// import addNewTab from './tab-object';
// import instantiateToDo from './to-do-instantiate';
// import addNewToDoRow from './to-do-row';

// export default function initDom() {
//     addNewTab();
//     instantiateTab();
//     addNewToDoRow();
//     instantiateToDo();
//     addNewProject();
//     instantiateProject();
// }
import { add } from 'date-fns';
import ProjectManager from './project-manager';

export default function initDom() {
    const projectManager = new ProjectManager();

    projectManager.addProject(); // This creates a new project
    projectManager.addTabToProject(1); // This adds a new tab to the created project
    projectManager.addToDoToTab(1, 1);
    const addNewRow = document.querySelector('#new-to-do-1');
    addNewRow.addEventListener('click', () => {
        projectManager.addToDoToTab(1, 1);
    });
}

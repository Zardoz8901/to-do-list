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
    projectManager.setActiveProject(1);
    projectManager.addTabToProject(1); // This adds a new tab to the created project
    projectManager.addToDoToTab(1, 1);

    const addNewRow = document.querySelector('#new-to-do-1');
    addNewRow.addEventListener('click', () => {
        projectManager.addToDoToTab(1, 1);
    });
    const addNewTab = document.querySelector('#new-tab');
    addNewTab.addEventListener('click', () => {
        projectManager.addTabToProject(1);
    });
    const addNewProject = document.querySelector('#new-project-1');
    addNewProject.addEventListener('click', () => {
        projectManager.addProject();
    });

    document.addEventListener('click', function (event) {
        if (event.target instanceof HTMLElement && event.target.classList.contains('project')) {
            // Extract the numeric ID part from the `id` attribute value
            // which is expected to be in the format "project-X"
            const idAttribute = event.target.id;
            const matches = idAttribute.match(/^project-(\d+)$/);

            // Use the first captured group from the regex which corresponds to the numeric part
            if (matches && matches[1]) {
                const projectId = parseInt(matches[1], 10);
                console.log(projectId);

                // Confirm we have a valid number before proceeding
                if (!isNaN(projectId)) {
                    projectManager.setActiveProject(projectId);
                } else {
                    console.error('Failed to parse project ID:', idAttribute);
                }
            } else {
                console.error('Invalid ID format:', idAttribute);
            }
        }
    });
}

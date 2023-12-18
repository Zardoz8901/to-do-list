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
    projectManager.setActiveProject(1);
    projectManager.setActiveTab(1, 1);

    const addNewTab = document.querySelector('#new-tab');
    if (addNewTab) {
        addNewTab.addEventListener('click', () => {
            const activeProjectElement = document.querySelector('.project.active');

            if (activeProjectElement) {
                // Extract project ID from the active project element's ID.
                const projectIdMatch = activeProjectElement.id.match(/^project-(\d+)$/);
                if (projectIdMatch) {
                    const projectId = parseInt(projectIdMatch[1], 10);

                    // Add a new tab to the active project.
                    projectManager.addTabToProject(projectId);

                    // Retrieve the updated project with the new tab added.
                    const project = projectManager.projects.find((p) => p.id === projectId);
                    if (project) {
                        // We assume the last tab in the array is the one just added.
                        const newTabId = project.tabs[project.tabs.length - 1].id;

                        // Add a to-do to the newly created tab.
                        projectManager.addToDoToTab(projectId, newTabId);
                        projectManager.setActiveTab(projectId, newTabId);
                    }
                } else {
                    console.error('Failed to parse project ID:', activeProjectElement.id);
                }
            } else {
                console.error('No active project found.');
            }
        });
    }

    const addNewProject = document.querySelector('#new-project-1');
    addNewProject.addEventListener('click', () => {
        projectManager.addProject();
    });

    document.addEventListener('click', function (event) {
        if (event.target instanceof HTMLElement && event.target.classList.contains('tab')) {
            // Extract the numeric ID part from the `id` attribute value
            // which is expected to be in the format "project-X"
            const idAttribute = event.target.id;
            const matches = idAttribute.match(/^project-(\d+)-tab-(\d+)$/);

            // Check if both the project ID and tab ID are captured
            if (matches && matches[1] && matches[2]) {
                const projectId = parseInt(matches[1], 10);
                const tabId = parseInt(matches[2], 10);

                console.log(`Project ID: ${projectId}, Tab ID: ${tabId}`);

                // Confirm we have valid numbers before proceeding
                if (!isNaN(projectId) && !isNaN(tabId)) {
                    projectManager.setActiveTab(projectId, tabId);
                    const addNewToDo = document.querySelector('.new-to-do');
                    if (addNewToDo) {
                        addNewToDo.addEventListener('click', () => {
                            projectManager.addToDoToTab(projectId, tabId);
                        });
                    }
                } else {
                    console.error('Failed to parse IDs:', idAttribute);
                }
            } else {
                console.error('Invalid ID format:', idAttribute);
            }
        }
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

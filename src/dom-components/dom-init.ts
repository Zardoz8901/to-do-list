import ProjectManager from './project-manager';

export default function initDom() {
    const projectManager = new ProjectManager();

    projectManager.addProject(); // This creates a new project
    projectManager.addTabToProject(1); // This adds a new tab to the created project
    projectManager.addToDoToTab(1, 1);
    projectManager.setActiveProject(1);
    projectManager.setActiveTab(1, 1);

    document.addEventListener('click', function (event) {
        if (event.target instanceof HTMLElement) {
            if (event.target.id === 'new-project-1') {
                // Logic for setting an active project
                addNewProject();
            } else if (event.target.classList.contains('project')) {
                setActiveProjectFromClick(event.target);
            } else if (event.target.classList.contains('tab')) {
                // Logic for setting an active tab
                setActiveTabFromClick(event.target);
            } else if (event.target.classList.contains('new-to-do')) {
                // Logic for adding a to-do to an active project and tab
                addNewToDo();
            } else if (event.target.id === 'new-tab') {
                // Logic for adding a new tab
                addNewTab();
            }
        }
    });

    function addNewTab() {
        // Retrieve the active project from the DOM
        const activeProjectElement = document.querySelector('.project.active');

        if (activeProjectElement) {
            const projectIdMatch = activeProjectElement.id.match(/^project-(\d+)$/);

            if (projectIdMatch) {
                const projectId = parseInt(projectIdMatch[1], 10);

                if (!isNaN(projectId)) {
                    const project = projectManager.projects.find((p) => p.id === projectId);
                    // Check if project already has 10 tabs before adding a new one
                    if (project && project.tabs.length < 10) {
                        // Add a new tab to the active project
                        projectManager.addTabToProject(projectId);
                        const newTabId = project.tabs[project.tabs.length - 1].id;

                        // Add a to-do to the newly created tab
                        projectManager.addToDoToTab(projectId, newTabId);

                        // Set the new tab as active
                        projectManager.setActiveTab(projectId, newTabId);

                        // Update the DOM to reflect the new active tab
                        const oldActiveTabElement = document.querySelector('.tab.active');
                        if (oldActiveTabElement) oldActiveTabElement.classList.remove('active');

                        const newActiveTabElement = document.querySelector(
                            `#project-${projectId}-tab-${newTabId}`
                        );
                        if (newActiveTabElement) newActiveTabElement.classList.add('active');
                    } else {
                        console.error(`Cannot add more than 10 tabs to project ID: ${projectId}`);
                    }
                } else {
                    console.error('Failed to parse project ID.');
                }
            } else {
                console.error('Failed to match project ID.');
            }
        } else {
            console.error('No active project found.');
        }
    }

    function setActiveProjectFromClick(target: HTMLElement) {
        const idAttribute = target.id;
        const matches = idAttribute.match(/^project-(\d+)$/);

        if (matches && matches[1]) {
            const projectId = parseInt(matches[1], 10);
            if (!isNaN(projectId)) {
                projectManager.setActiveProject(projectId);
                // Get the newly active project
                const activeProject = projectManager.projects.find(
                    (project) => project.id === projectId
                );
                if (activeProject && activeProject.tabs.length > 0) {
                    // Set the first tab of the newly active project as the active tab
                    const firstTabId = activeProject.tabs[0].id;
                    projectManager.setActiveTab(projectId, firstTabId);
                }
            } else {
                console.error('Failed to parse project ID:', idAttribute);
            }
        } else {
            console.error('Invalid ID format:', idAttribute);
        }
    }

    function setActiveTabFromClick(target: HTMLElement) {
        const idAttribute = target.id;
        const matches = idAttribute.match(/^project-(\d+)-tab-(\d+)$/);

        if (matches && matches[1] && matches[2]) {
            const projectId = parseInt(matches[1], 10);
            const tabId = parseInt(matches[2], 10);

            if (!isNaN(projectId) && !isNaN(tabId)) {
                projectManager.setActiveTab(projectId, tabId);
            } else {
                console.error('Failed to parse IDs:', idAttribute);
            }
        } else {
            console.error('Invalid ID format:', idAttribute);
        }
    }

    function addNewToDo() {
        // Retrieve the active project and tab from the DOM
        const activeProjectElement = document.querySelector('.project.active');
        const activeTabElement = document.querySelector('.tab.active');

        // Use the active project and tab to determine where to add the new to-do item
        if (activeProjectElement && activeTabElement) {
            const projectIdMatch = activeProjectElement.id.match(/^project-(\d+)$/);
            const tabIdMatch = activeTabElement.id.match(/^project-(\d+)-tab-(\d+)$/);

            if (projectIdMatch && tabIdMatch) {
                const projectId = parseInt(projectIdMatch[1], 10);
                const tabId = parseInt(tabIdMatch[2], 10);

                if (!isNaN(projectId) && !isNaN(tabId)) {
                    projectManager.addToDoToTab(projectId, tabId);
                } else {
                    console.error('Failed to parse project/tab IDs.');
                }
            } else {
                console.error('Failed to match project/tab IDs.');
            }
        } else {
            console.error('No active project or tab found.');
        }
    }

    function addNewProject() {
        // Calculate the new project ID
        const lastProject = projectManager.projects[projectManager.projects.length - 1];
        const newProjectId = lastProject.id + 1;

        if (projectManager.projects.length >= 15) {
            console.error('Cannot add more than 15 projects');
            return;
        }
        // Add the new project
        projectManager.addProject();

        // After creating the new project, mark it as activef
        projectManager.setActiveProject(newProjectId);

        // After setting the new project as active, create and set the first tab as active
        projectManager.addTabToProject(newProjectId);
        const newProject = projectManager.projects.find((project) => project.id === newProjectId);
        if (newProject) {
            const newTabId = newProject.tabs[0].id;
            projectManager.setActiveTab(newProjectId, newTabId);

            // Add a to-do to the newly created tab
            projectManager.addToDoToTab(newProjectId, newTabId);
        }
    }
}

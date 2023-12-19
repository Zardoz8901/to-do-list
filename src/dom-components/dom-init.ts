import ProjectManager from './project-manager';

export default function initDom() {
    const projectManager = new ProjectManager();

    projectManager.addProject(); // This creates a new project
    projectManager.addTabToProject(1); // This adds a new tab to the created project
    projectManager.addToDoToTab(1, 1);
    projectManager.setActiveProject(1);
    projectManager.setActiveTab(1, 1);

    document.addEventListener('click', function (event) {
        if (!(event.target instanceof HTMLElement)) return;

        const targetId = event.target.id;
        switch (true) {
            case targetId === 'new-project-1':
                addNewProject();
                break;
            case event.target.classList.contains('project'):
                setActiveProjectFromClick(event.target);
                break;
            case event.target.classList.contains('tab'):
                setActiveTabFromClick(event.target);
                break;
            case event.target.classList.contains('new-to-do'):
                addNewToDo();
                break;
            case targetId === 'new-tab':
                addNewTab();
                break;
            case event.target.classList.contains('delete-todo'):
                deleteToDoOnClick(event.target);
                break;
            // Add other cases as needed
        }
    });

    function deleteToDoOnClick(target: HTMLElement) {
        const todoElement = target.closest('.to-do-row');
        const idMatch = todoElement?.id.match(/to-do-project-(\d+)-tab-(\d+)-todo-(\d+)/);
        if (idMatch) {
            const projectId = parseInt(idMatch[1], 10);
            const tabId = parseInt(idMatch[2], 10);
            const todoId = parseInt(idMatch[3], 10);

            if (!isNaN(projectId) && !isNaN(tabId) && !isNaN(todoId)) {
                projectManager.deleteToDoFromTab(projectId, tabId, todoId);
                todoElement.remove(); // Remove the todo element from the DOM
                projectManager.checkAndDeleteEmptyTab(projectId, tabId);
            }
        }
    }

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
                    if (project.tabs.length < 10) {
                        // Add a new tab to the active project
                        projectManager.addTabToProject(projectId);
                        const newTabId = project.tabs[project.tabs.length - 1].id;
                        console.log(newTabId);

                        // Add a to-do to the newly created tab
                        projectManager.addToDoToTab(projectId, newTabId);

                        // Set the new tab as active
                        projectManager.setActiveTab(projectId, newTabId);
                    }
                }
            }
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
                console.log(projectId + tabId);
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
        console.log(activeProjectElement, activeTabElement);
        // Use the active project and tab to determine where to add the new to-do item
        if (activeProjectElement && activeTabElement) {
            const projectIdMatch = activeProjectElement.id.match(/^project-(\d+)$/);
            const tabIdMatch = activeTabElement.id.match(/^project-(\d+)-tab-(\d+)$/);

            if (projectIdMatch && tabIdMatch) {
                const projectId = parseInt(projectIdMatch[1], 10);
                const tabId = parseInt(tabIdMatch[2], 10);

                if (!isNaN(projectId) && !isNaN(tabId)) {
                    projectManager.addToDoToTab(projectId, tabId);
                    console.log(projectId, tabId, 'to-do');
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

        if (projectManager.projects.length === 15) {
            console.error('Cannot add more than 15 projects');
            return;
        }
        // Add the new project
        projectManager.addProject();

        // After creating the new project, mark it as active
        projectManager.setActiveProject(newProjectId);

        // After setting the new project as active, create and set the first tab as active
        const newTabId = projectManager.addTabToProject(newProjectId);
        if (newTabId) {
            projectManager.setActiveTab(newProjectId, newTabId);

            // Add a to-do to the newly created tab
            projectManager.addToDoToTab(newProjectId, newTabId);
            console.log(newProjectId, newTabId);
        }
    }
}

import Project from './project-class';
import Tab from './tab-class';
import ToDo from './to-do-class';
import RenderUtils from './render-utils';

export default class ProjectManager {
    public projects: Project[] = [];
    private projectCounter: number = 1;

    public addProject() {
        const newProject = new Project(this.projectCounter++);

        this.projects.push(newProject);
        this.renderProject(newProject);
    }

    public addTabToProject(projectId: number): number {
        const project = this.projects.find((p) => p.id === projectId);
        if (!project) return;

        const newTabId = project.tabs.length + 1;
        const newTab = new Tab(newTabId);
        project.tabs.push(newTab);
        this.renderTabsForProject(project);
        return newTabId;
    }

    public addToDoToTab(projectId: number, tabId: number) {
        const project = this.projects.find((p) => p.id === projectId);
        const tab = project?.tabs.find((t) => t.id === tabId);
        if (!tab) return;

        if (tab.toDos.length >= 17) {
            console.error(`Cannot add more than 17 to-dos to tab ID: ${tabId}`);
            return;
        }

        if (tab) {
            const newToDoId = tab.toDos.length + 1;
            const newToDo = new ToDo(newToDoId);
            tab.toDos.push(newToDo);
            this.renderToDosForTab(tab, project); // Ensure this method is called here!
        } else {
            console.error(
                `Project or Tab not found, cannot add ToDo. Project ID: ${projectId}, Tab ID: ${tabId}`
            );
        }
    }

    public setActiveProject(projectId: number) {
        // Remove active class from all projects and hide all tabs and to-dos
        this.projects.forEach((project) => {
            project.isActive = false;
            this.updateProjectClass(project, false);
            project.tabs.forEach((tab) => {
                tab.isDisplayed = false;
                this.updateTabVisibility(tab, false, project.id);
            });
        });

        // Find the project and set it as active
        const project = this.projects.find((p) => p.id === projectId);
        if (project) {
            project.isActive = true;
            this.updateProjectClass(project, true);
            project.tabs.forEach((tab) => {
                tab.isDisplayed = true;
                this.updateTabVisibility(tab, true, project.id);
            });
        }
    }

    public setActiveTab(projectId: number, tabId: number) {
        // Locate the active project
        const project = this.projects.find((p) => p.id === projectId);
        if (project) {
            // First, set all tabs and their to-dos to inactive/not displayed
            project.tabs.forEach((tab) => {
                tab.isActive = false;
                this.updateTabClass(project, tab, false);
                tab.toDos.forEach((toDo) => {
                    toDo.isDisplayed = false;
                    this.updateToDoVisibility(toDo, false, tab.id, project.id);
                });
            });

            // Then, find and set the specified tab to active/displayed along with its to-dos
            const activeTab = project.tabs.find((t) => t.id === tabId);
            if (activeTab) {
                this.removeFromActiveTabHistory(projectId, tabId);
                activeTab.isActive = true;
                this.updateTabClass(project, activeTab, true);
                this.activeTabHistory.push({ projectId, tabId }); //new implementation
                activeTab.toDos.forEach((toDo) => {
                    toDo.isDisplayed = true;
                    this.updateToDoVisibility(toDo, true, tabId, projectId);
                });
            } else {
                console.error(`Tab with ID: ${tabId} not found in project with ID: ${projectId}`);
            }
        } else {
            console.error(`Project with ID: ${projectId} not found.`);
        }
    }

    private updateTabVisibility(tab: Tab, makeVisible: boolean, projectId: number) {
        const tabElement = document.querySelector(`[id="project-${projectId}-tab-${tab.id}"]`);
        if (tabElement) {
            if (makeVisible) {
                tabElement.classList.remove('visually-hidden');
                tab.toDos.forEach((toDo) => {
                    this.updateToDoVisibility(toDo, true, tab.id, projectId);
                });
            } else {
                tabElement.classList.add('visually-hidden');
                tab.toDos.forEach((toDo) => {
                    this.updateToDoVisibility(toDo, false, tab.id, projectId);
                });
            }
        } else {
            console.error(
                `Tab DOM element with id="project-${projectId}-tab-${tab.id}" not found.`
            );
        }
    }

    private updateToDoVisibility(
        toDo: ToDo,
        makeVisible: boolean,
        tabId: number,
        projectId: number
    ) {
        const toDoElement = document.querySelector(
            `#to-do-project-${projectId}-tab-${tabId}-todo-${toDo.id}`
        );
        if (toDoElement) {
            if (makeVisible) {
                toDoElement.classList.remove('visually-hidden');
            } else {
                toDoElement.classList.add('visually-hidden');
            }
        } else {
            console.error(
                `toDo DOM element with id="project-${projectId}-tab-${tabId}-todo-${toDo.id}" not found.`
            );
        }
    }

    private updateProjectClass(project: Project, isActive: boolean) {
        // Select project DOM element using a unique identifier
        const projectElement = document.querySelector(`[id="project-${project.id}"]`);
        if (projectElement) {
            projectElement.classList.toggle('active', isActive);
        } else {
            // If this logs an error, your DOM element may not exist or the data-id may be incorrect.
            console.error(`Project DOM element with data-id="project-${project.id}" not found.`);
        }
    }

    private updateTabClass(project: Project, tab: Tab, isActive: boolean) {
        const tabElement = document.querySelector(`[id="project-${project.id}-tab-${tab.id}"]`);
        if (tabElement) {
            tabElement.classList.toggle('active', isActive);
        }
    }

    public deleteToDoFromTab(projectId: number, tabId: number, todoId: number) {
        const project = this.projects.find((p) => p.id === projectId);
        const tab = project.tabs.find((t) => t.id === tabId);
        const todoIndex = tab.toDos.findIndex((todo) => todo.id === todoId);

        if (todoIndex > -1) {
            tab.toDos.splice(todoIndex, 1); // Removes the todo from the tab's todos array
        }
    }

    public checkAndDeleteEmptyTab(projectId: number, tabId: number) {
        const project = this.projects.find((p) => p.id === projectId);
        const tab = project?.tabs.find((t) => t.id === tabId);

        if (tab && tab.toDos.length === 0) {
            this.activeTabHistory = this.activeTabHistory.filter(
                (history) => !(history.projectId === projectId && history.tabId === tabId)
            );
            // Remove the tab from the project's tabs array
            const tabIndex = project.tabs.findIndex((t) => t.id === tabId);
            if (tabIndex > -1) {
                project.tabs.splice(tabIndex, 1);
            }

            // Remove the tab from the DOM
            this.removeTabFromDom(projectId, tabId);
            if (project?.tabs.length === 0) {
                this.fallbackToLastActiveTab();
            } else {
                // If there are still tabs in the current project, set the last tab as active
                const lastTabId = project.tabs[project.tabs.length - 1].id;
                this.setActiveTab(projectId, lastTabId);
            }
        }
    }

    private removeTabFromDom(projectId: number, tabId: number) {
        const tabElement = document.querySelector(`#project-${projectId}-tab-${tabId}`);
        if (tabElement && tabElement.parentNode) {
            tabElement.parentNode.removeChild(tabElement);
        }
    }

    private renderProject(project: Project) {
        RenderUtils.renderProject(project);
    }

    private renderTabsForProject(project: Project) {
        const latestTab = project.tabs[project.tabs.length - 1];
        RenderUtils.renderTab(latestTab, project);
    }

    private renderToDosForTab(tab: Tab, project: Project) {
        const latestToDo = tab.toDos[tab.toDos.length - 1];
        RenderUtils.renderToDo(latestToDo, tab, project);
    }

    private fallbackToLastActiveTab() {
        // Check if we have any history to fallback to
        if (this.activeTabHistory.length > 0) {
            const lastActive = this.activeTabHistory.pop();
            if (lastActive) {
                this.setActiveTab(lastActive.projectId, lastActive.tabId);
            }
        } else {
            console.error('No previous active tabs to fallback to.');
        }
    }

    private removeFromActiveTabHistory(projectId: number, tabId: number) {
        this.activeTabHistory = this.activeTabHistory.filter(
            (history) => !(history.projectId === projectId && history.tabId === tabId)
        );
    }

    private activeTabHistory: { projectId: number; tabId: number }[] = [];
}

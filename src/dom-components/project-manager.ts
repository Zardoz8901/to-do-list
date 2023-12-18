import Project from './project-class';
import Tab from './tab-class';
import ToDo from './to-do-class';
import RenderUtils from './render-utils';

export default class ProjectManager {
    private projects: Project[] = [];
    private projectCounter: number = 1;
    private tabCounter: number = 1;
    private toDoCounter: number = 1;

    public addProject() {
        const newProject = new Project(this.projectCounter++);
        this.projects.push(newProject);
        this.renderProject(newProject);
    }

    public addTabToProject(projectId: number) {
        const project = this.projects.find((p) => p.id === projectId);
        if (!project) return;

        const newTab = new Tab(this.tabCounter++);
        project.tabs.push(newTab);
        this.renderTabsForProject(project);
    }

    public addToDoToTab(projectId: number, tabId: number) {
        const project = this.projects.find((p) => p.id === projectId);
        const tab = project?.tabs.find((t) => t.id === tabId);
        if (!tab) return;

        if (tab) {
            const newToDo = new ToDo(this.toDoCounter++);
            tab.toDos.push(newToDo);
            this.renderToDosForTab(tab); // Ensure this method is called here!
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
                this.updateTabVisibility(tab, false);
            });
        });

        // Find the project and set it as active
        const project = this.projects.find((p) => p.id === projectId);
        if (project) {
            project.isActive = true;
            this.updateProjectClass(project, true);
            project.tabs.forEach((tab) => {
                tab.isDisplayed = true;
                this.updateTabVisibility(tab, true);
            });
        }
        console.log(project);
    }

    private updateTabVisibility(tab: Tab, makeVisible: boolean) {
        const tabElement = document.querySelector(`[id="tab-${tab.id}"]`);
        if (makeVisible) {
            tabElement?.classList.add('visually-hidden');
        } else {
            tabElement?.classList.remove('visually-hidden');
        }
        console.log(tabElement);
    }

    private updateProjectClass(project: Project, isActive: boolean) {
        // Select project DOM element using a unique identifier, e.g., 'data-id' attribute
        const projectElement = document.querySelector(`[id="project-${project.id}"]`);
        if (projectElement) {
            projectElement.classList.toggle('active', isActive);
        } else {
            // If this logs an error, your DOM element may not exist or the data-id may be incorrect.
            console.error(`Project DOM element with data-id="project-${project.id}" not found.`);
        }
    }

    private renderProject(project: Project) {
        RenderUtils.renderProject(project);
    }

    private renderTabsForProject(project: Project) {
        const latestTab = project.tabs[project.tabs.length - 1];
        RenderUtils.renderTab(latestTab);
    }

    private renderToDosForTab(tab: Tab) {
        const latestToDo = tab.toDos[tab.toDos.length - 1];
        RenderUtils.renderToDo(latestToDo);
    }
}

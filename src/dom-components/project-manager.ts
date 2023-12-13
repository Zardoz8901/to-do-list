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

    private renderProject(project: Project) {
        RenderUtils.renderProject(project);
    }

    private renderTabsForProject(project: Project) {
        project.tabs.forEach((tab) => RenderUtils.renderTab(tab));
    }

    private renderToDosForTab(tab: Tab) {
        const latestToDo = tab.toDos[tab.toDos.length - 1];
        RenderUtils.renderToDo(latestToDo);
    }
}

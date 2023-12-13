import Project from './project-class';
import Tab from './tab-class';
import ToDo from './to-do-class';

export default class ProjectManager {
    private projects: Project[] = [];
    private projectCounter: number = 0;
    private tabCounter: number = 0;
    private toDoCounter: number = 0;

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
        if (tab!) return;

        const newToDo = new ToDo(this.toDoCounter++);
        tab.toDos.push(newToDo);
        this.renderToDosForTab(tab);
    }

    private renderProject(project: Project) {}

    private renderTabsForProject(project: Project) {}

    private renderToDosForTab(tab: Tab) {}
}

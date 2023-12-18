import Tab from './tab-class';

export default class Project {
    id: number;
    isActive: boolean;
    tabs: Tab[];

    constructor(id: number, isActive = false) {
        this.id = id;
        this.isActive = isActive;
        this.tabs = [];
    }
}

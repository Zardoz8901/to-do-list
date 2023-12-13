import Tab from './tab-class';

export default class Project {
    id: number;
    tabs: Tab[];

    constructor(id: number) {
        this.id = id;
        this.tabs = [];
    }
}

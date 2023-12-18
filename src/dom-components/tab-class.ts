import ToDo from './to-do-class';

export default class Tab {
    id: number;
    isDisplayed: boolean;
    isActive: boolean;
    toDos: ToDo[];

    constructor(id: number, isActive = false, isDisplayed = false) {
        this.id = id;
        this.isActive = isActive;
        this.isDisplayed = isDisplayed;
        this.toDos = [];
    }
}

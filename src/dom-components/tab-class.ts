import ToDo from './to-do-class';

export default class Tab {
    id: number;
    isDisplayed: boolean;
    toDos: ToDo[];

    constructor(id: number, isDisplayed = false) {
        this.id = id;
        this.isDisplayed = isDisplayed;
        this.toDos = [];
    }
}

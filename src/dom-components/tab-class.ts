import ToDo from './to-do-class';

export default class Tab {
    id: number;
    toDos: ToDo[];

    constructor(id: number) {
        this.id = id;
        this.toDos = [];
    }
}

export default class ToDo {
    id: number;
    isDisplayed: boolean;

    constructor(id: number, isDisplayed = false) {
        this.id = id;
        this.isDisplayed = isDisplayed;
    }
}

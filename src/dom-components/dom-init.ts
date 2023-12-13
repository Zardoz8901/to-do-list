import instantiateProject from './project-instantiate';
import addNewProject from './project-object';
import instantiateTab from './tab-instantiate';
import addNewTab from './tab-object';
import instantiateToDo from './to-do-instantiate';
import addNewToDoRow from './to-do-row';

export default function initDom() {
    addNewTab();
    instantiateTab();
    addNewToDoRow();
    instantiateToDo();
    addNewProject();
    instantiateProject();
}

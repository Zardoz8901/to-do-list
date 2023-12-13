import limiter from './object-limiter';
import addNewProject from './project-object';

export default function instantiateProject() {
    const newProjectButton = document.querySelector('#new-project-1');

    newProjectButton.addEventListener('click', () => {
        limiter('.project', 15, addNewProject);
    });
}

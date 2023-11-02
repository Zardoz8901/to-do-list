// piority-slider module that allows for sliding a click in box to set priority
export default function prioritySlider() {
    const calendarElements = document.querySelectorAll('.calendar-element');
    calendarElements.forEach((calendarElement) => {
        const container = calendarElement.querySelector('.priority-slider');
        if (!container) {
            console.error('Priority container not found.');
            return;
        }

        const slider = container.querySelector('.priority-input') as HTMLInputElement;
        const boxes = container.querySelectorAll<HTMLDivElement>('.box');
        let isMouseDown = false;

        // event Listeners for mouse down and up
        container.addEventListener('mousedown', () => {
            isMouseDown = true;
        });
        document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        // mouse Move event for sliding effect
        // mouse move fires, the function checks the x position
        // if the left boundary of the box is crossedm the value is updated
        container.addEventListener('mousemove', function (event: MouseEvent) {
            if (isMouseDown) {
                const boxLeft = boxes[0].getBoundingClientRect().left;
                if (event.clientX <= boxLeft) {
                    slider.value = '0';
                } else {
                    boxes.forEach((box, index) => {
                        if (event.clientX > box.getBoundingClientRect().left) {
                            slider.value = (index + 1).toString();
                        }
                    });
                }
                updateColors();
            }
        });

        // if the slider value is equal to the index + 1 reset the slider value
        // we check if the box is the first box index[0] and that the value = 0
        // if both are true then we set the value to 1, creating a toggle
        // otherwise we set slider value to index + 1
        boxes.forEach((box, index) => {
            const handleBoxSelection = function () {
                if (parseInt(slider.value) === index + 1) {
                    slider.value = '0';
                } else {
                    slider.value =
                        index === 0 && slider.value === '0' ? '1' : (index + 1).toString();
                }
                updateColors();
            };
            box.addEventListener('mouseover', function () {
                if (!isMouseDown) return;
                handleBoxSelection();
            });

            box.addEventListener('click', handleBoxSelection);
        });

        // when weight is 1 the rgb value will be close to klein blue
        // when weigh is 0 the rgb value will be white
        // intermediate values fall between blue and white
        function getColorForPriority(value: number): string {
            const weight = value / 5;
            const wr = weight * 55 + (1 - weight) * 255;
            const wg = weight * 46 + (1 - weight) * 255;
            const wb = weight * 165 + (1 - weight) * 255;
            return `rgb(${Math.round(wr)}, ${Math.round(wg)}, ${Math.round(wb)})`;
        }

        // dynamically changes the color of each box comparing index to priority value
        // passes a string to integer and sets it to base 10
        // the position should be filled with color
        function updateColors() {
            const sliderValue = parseInt(slider.value, 10);
            boxes.forEach((box, index) => {
                if (index < sliderValue) {
                    box.style.background = getColorForPriority(sliderValue);
                } else {
                    box.style.background = 'white';
                }
            });
        }
    });
}

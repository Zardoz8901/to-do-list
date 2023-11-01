// // piority-slider module that allows for sliding a click in box to set priority
// export default function prioritySlider() {
//     const container = document.getElementById('priority-container-1');
//     if (!container) {
//         console.error('Priority container not found.');
//         return;
//     }

//     const slider = document.getElementById('priority-slider-1') as HTMLInputElement;
//     const boxes = container.querySelectorAll<HTMLDivElement>('.box'); // Ensures boxes are only selected from within the container

//     boxes.forEach((box, index) => {
//         box.addEventListener('click', function () {
//             // if the slider value is equal to the index + 1 reset the slider value
//             if (parseInt(slider.value) === index + 1) {
//                 slider.value = '0';
//             }
//             // we check if the box is the first box index[0] and that the value = 0
//             // if both are true then we set the value to 1, creating a toggle
//             // otherwise we set slider value to index + 1
//             else {
//                 slider.value = index === 0 && slider.value === '0' ? '1' : (index + 1).toString();
//             }
//             updateColors();
//         });
//     });

//     // when weight is 1 the rgb value will be close to klein blue
//     // when weigh is 0 the rgb value will be white
//     // intermediate values fall between blue and white
//     function getColorForPriority(value: number): string {
//         const weight = value / 5;
//         const wr = weight * 55 + (1 - weight) * 255;
//         const wg = weight * 46 + (1 - weight) * 255;
//         const wb = weight * 165 + (1 - weight) * 255;

//         return `rgb(${Math.round(wr)}, ${Math.round(wg)}, ${Math.round(wb)})`;
//     }

//     // dynamically changes the color of each box comparing index to priority value
//     function updateColors() {
//         // passes a string to integer and sets it to base 10
//         const sliderValue = parseInt(slider.value, 10);
//         boxes.forEach((box, index) => {
//             // the position should be filled with color
//             if (index < sliderValue) {
//                 box.style.background = getColorForPriority(sliderValue);
//             } else {
//                 box.style.background = 'white';
//             }
//         });
//     }
// }
// piority-slider module that allows for sliding a click in box to set priority
export default function prioritySlider() {
    const container = document.getElementById('priority-container-1');
    if (!container) {
        console.error('Priority container not found.');
        return;
    }

    const slider = document.getElementById('priority-slider-1') as HTMLInputElement;
    const boxes = container.querySelectorAll<HTMLDivElement>('.box');
    let isMouseDown = false;

    // Event Listeners for Mouse Down and Up
    container.addEventListener('mousedown', () => {
        isMouseDown = true;
    });
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Mouse Move event for sliding effect
    container.addEventListener('mousemove', function (event) {
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

    boxes.forEach((box, index) => {
        const handleBoxSelection = function () {
            if (parseInt(slider.value) === index + 1) {
                slider.value = '0';
            } else {
                slider.value = index === 0 && slider.value === '0' ? '1' : (index + 1).toString();
            }
            updateColors();
        };

        box.addEventListener('mouseover', function () {
            if (!isMouseDown) return;
            handleBoxSelection();
        });

        box.addEventListener('click', handleBoxSelection);
    });

    function getColorForPriority(value: number): string {
        const weight = value / 5;
        const wr = weight * 55 + (1 - weight) * 255;
        const wg = weight * 46 + (1 - weight) * 255;
        const wb = weight * 165 + (1 - weight) * 255;
        return `rgb(${Math.round(wr)}, ${Math.round(wg)}, ${Math.round(wb)})`;
    }

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
}

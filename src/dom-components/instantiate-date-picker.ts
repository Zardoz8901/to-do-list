import { CountdownManager } from '../time-components/countdown-manager';
import { datePicker } from '../time-components/flatpickr';

export default function instantiateDatePicker(projectId: number, tabId: number, todoId: number) {
    const pickerElement = document.getElementById(
        `date-picker-project-${projectId}-tab-${tabId}-todo-${todoId}`
    ) as HTMLElement;

    if (pickerElement) {
        const currentCountdown = new CountdownManager();
        // Assuming datePicker initializes the flatpickr with proper configs.
        datePicker(pickerElement, currentCountdown);
    }
}

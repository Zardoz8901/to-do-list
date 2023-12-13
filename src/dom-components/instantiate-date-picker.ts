import { CountdownManager } from '../time-components/countdown-manager';
import { datePicker } from '../time-components/flatpickr';

export default function instantiateDatePicker(todoId: number) {
    const pickerElement = document.getElementById(`date-picker-${todoId}`) as HTMLElement;

    if (pickerElement) {
        const currentCountdown = new CountdownManager();
        // Assuming datePicker initializes the flatpickr with proper configs.
        datePicker(pickerElement, currentCountdown);
    }
}

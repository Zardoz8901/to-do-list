export default function print(element: Element | Node, stringToPrint: string) {
    element.textContent = stringToPrint;
}

export default function limiter(query: string, limit: number, output: Function) {
    const tabs = document.querySelectorAll(query);
    if (tabs.length < limit) {
        output();
    }
}

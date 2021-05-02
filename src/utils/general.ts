export function getRandomKey(): string {
    return `${Date.now()}${Math.random()}${Math.random()}`;
}
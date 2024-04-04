export default function getRandomElement<T>(arr: Array<any>): T {
    return arr[Math.floor(Math.random() * arr.length)];
}
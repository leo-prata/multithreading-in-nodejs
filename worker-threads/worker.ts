import { parentPort } from 'worker_threads';

let i = 0;
while (i < 20_000_000_000) {
    i++;
}

if (parentPort) {
    parentPort.postMessage(`Result is ${i}`);
}
import { workerData, parentPort } from 'worker_threads';

let i = 0;
while (i < 20_000_000_000 / workerData.thread_count) {
    i++;
}

if (parentPort) {
    parentPort.postMessage(i);
}
import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const numCPUs = os.availableParallelism();

console.log(`The number of CPUs is: ${numCPUs}`);
console.log(`Master process id: ${process.pid}`);
cluster.setupPrimary({
    exec: `${__dirname}/server.js`,
});

for(let i = 0; i < numCPUs; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process id ${worker.process.pid} exited with code ${code}`);
    console.log(`Starting a new worker`);
    cluster.fork();
}); 
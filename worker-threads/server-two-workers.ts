    import express, {Request, Response} from 'express';
    import { Worker } from 'worker_threads';

    const app = express();
    const port = 3111;

    const THREAD_COUNT = 2;

    app.get('/non-blocking/', (req: Request, res:Response) => {
        res.status(200).send('Non-blocking request');
    });

    function createWorker(){
        return new Promise<string>((resolve: (value: string) => void, reject: (reason?: any) => void) => {
            const worker = new Worker('./two-workers.ts', {
                workerData: {
                    thread_count: THREAD_COUNT
                }
            });

            worker.on('message', (data) => {
                resolve(data);
            });
        
            worker.on('error', (err) => {
                reject(err);
            });
        });
    }

    app.get('/blocking', async (req: Request, res:Response) => {
        const workerPromises = [];

        for(let i = 0; i < THREAD_COUNT; i++){
            workerPromises.push(createWorker());
        }

        const thread_results = await Promise.all(workerPromises);
        const total = thread_results[0] + thread_results[1];

        res.status(200).send(`Result is ${total}`);

    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
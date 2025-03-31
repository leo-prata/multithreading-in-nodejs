import express, {Request, Response} from 'express';
import { Worker } from 'worker_threads';

const app = express();
const port = 3111;

app.get('/non-blocking/', (req: Request, res:Response) => {
    res.status(200).send('Non-blocking request');
});

app.get('/blocking', async (req: Request, res:Response) => {
    const worker = new Worker('./worker.ts');

    worker.on('message', (data) => {
        res.status(200).send(`Result is ${data}`);
    });

    worker.on('error', (err) => {
        res.status(404).send(`Error: ${err}`);
    });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
import express, { Request, Response } from 'express';

const app = express();
const port = 3111;

app.get('/heavy', (req: Request, res: Response) => {
    let total = 0;
    for(let i = 0; i < 50_000_000; i++) {
        total += i;
    }

    res.send(`Total: ${total}`);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`worker process id: ${process.pid}`);
});
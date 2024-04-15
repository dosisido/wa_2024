import express, { Request, Response } from 'express';
import api_router from './api';

const app = express();
app.use(express.json());
app.use('/api', api_router);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});


app.use((req:Request, res:Response) => {
    console.error('Route not found:', req.url);
    res.status(404).send('Route not found');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
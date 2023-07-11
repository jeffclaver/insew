import express from 'express';
import { database } from './database/database';
import router from './routers/routes';

const app = express();
const port = 3000;


app.use(express.json());
app.use('/api', router);

app.listen(port, () => {

    database.authenticate().then(() =>{
        console.log('DB Connection is running');
    });

    console.log(`Server running on port ${port}`);
  });
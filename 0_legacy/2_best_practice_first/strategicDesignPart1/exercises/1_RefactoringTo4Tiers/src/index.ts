import express, { Request, Response } from 'express';

const cors = require('cors');

export const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

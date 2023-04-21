import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB Error => ', err));

// middleware
app.use(cors());
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

// route middleware
async function importRoutes() {
  const routeFiles = readdirSync('./routes');
  for (const r of routeFiles) {
    const router = (await import(`./routes/${r}`)).default;
    app.use('/api', router);
  }
}
importRoutes();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

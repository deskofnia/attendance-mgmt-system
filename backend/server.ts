// require database connection
import express from 'express';
import cors from 'cors';
import { dbConnect } from "./db/db.config";
import routes from './routes/routes';
import * as dotenv from "dotenv";
dotenv.config({ path: '.env'})


// execute database connection
dbConnect();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());   //convert body into json
app.use("/api", routes);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
});
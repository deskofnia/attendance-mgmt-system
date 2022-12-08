// require database connection
const express = require('express');
const cors = require('cors');
const dbConnect = require("./db/db.config");
import routes from './routes/routes';


// execute database connection
dbConnect();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());   //convert body into json
app.use("/api/", routes);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
});
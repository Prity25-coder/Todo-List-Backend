import "dotenv/config"
import express from "express";


// create app
const app = express();



// parse json of incoming request body
app.use(express.json({ limit: "17kb" }));

// configure urlencoded data
app.use(express.urlencoded({ limit: "17kb", extended: true }));


export default app;
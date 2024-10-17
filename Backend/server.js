import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./Router/Route.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

// GET request
app.get('/',(req,res)=>{
    res.status(201).json("Home GET request");
})

//API Routes 
app.use('/api',router)

//start the server only if there is a valid connection
connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server connected to backend : ${port}`)
        })
    }catch(error){
        console.log(`Cannot connect to the server`)
    }
}).catch(error=>{
    console.log('Invalid database connection')
})

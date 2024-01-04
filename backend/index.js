import express from "express"
import {PORT,MONGODBURL} from "./config.js"
import mongoose from "mongoose"
import {Book} from "./models/bookmodels.js"
import booksRoute from "./Routes/booksRoute.js"
import cors from "cors"

const app = express()

 app.use(express.json())
 // middleware to cors
 app.use(cors())
//  app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["content-type"]
//  }))

app.get("/",(request,response)=>{
    console.log(request)
    return response.status(234).send(`Welcome to mern stack app`)
})
app.use("/books", booksRoute)

mongoose.connect(MONGODBURL).then(()=>{console.log(`App is connected to database`)
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})})
.catch((error)=>{console.log(error)})
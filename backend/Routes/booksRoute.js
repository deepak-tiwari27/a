 import express from "express"
 const router = express.Router()
 import {Book} from "../models/bookmodels.js"


//Route for save a new Book
router.post("/", async (request,response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:`send all required fields: title,author,publishYear`})
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        }
        const book = await  Book.create(newBook)
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message})
        
    }
    })
    //Route for geteting all books
    router.get("/", async(request,response)=>{
        try {
            const books = await Book.find({})
            return response.status(200).send({
                count:books.length,
                data:books
            })
            
        } catch (error) {
            console.log(error)
            response.status(501).send(error.message)
            
        }
    })
    router.get("/:id", async(request,response)=>{
        try {
            const {id}= request.params
            const book = await Book.findById(id)
            return response.status(200).send(book)
            
        } catch (error) {
            console.log(error)
            response.status(501).send(error.message)
            
        }
    })
    //Route to uodate a book
    router.put("/:id", async (request,response)=>{
        try {
            if(!request.body.title || !request.body.author || !request.body.publishYear){
                return response.status(400).send({message:`send all required fields: title,author,publishYear`})
            }
            const {id} = request.params
            const result = await Book.findByIdAndUpdate(id,request.body)
            if(!result){
                response.status("404").json({message: "Book not found"})
            }
            return response.status(200).json({message:"Book updated successfully"})
            
        } catch (error) {
            console.log(error)
            response.status(500).send({message:error.message})
            
        }
    })
    //Route for deleting a book
    router.delete("/:id",async(request,response)=>{
        try {
            const {id}= request.params
            const result = await Book.findByIdAndDelete(id)
            if(!result){
                response.status(404).json({message:"Book not found"})
            }
            return response.status(200).json({message:"book deletd successfully"})
            
        } catch (error) {
            console.log(error)
            response.status(500).send({message:error.message})
            
        }
    })
    export default router
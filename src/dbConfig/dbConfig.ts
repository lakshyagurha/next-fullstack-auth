import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("Mongodb Successfully connected")
        })
        connection.on('error', (err)=>{
            console.log("Mongodb Connection error Plese make sure mongodb is running" + err)
        })

    }catch (error){
        console.log("Something went wrong")
    }
}
import mongoose from "mongoose";

const connectDB = async ()=>{
  try{
      const connection =  mongoose.connect(`${process.env.DB_URL}`)
      console.log(`\n MongoDB Succesfully Connected \n DB HOST: ${(await connection).connection.host}`)
  }
  catch(error){
      console.log(`ERROR: ${error}`)
      process.exit(1) 
  }
}

export default connectDB
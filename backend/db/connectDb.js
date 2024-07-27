import mongoose from "mongoose";

  const connectDb = async (DATABASE_uri) =>{
   try{
      const DB_OPTIONS = {
         dbName:'Dashboard'
      }
      await mongoose.connect(DATABASE_uri, DB_OPTIONS);
      console.log('Database Connected Successfully')
   }
   catch(error){
      console.log(error)

   }
 }

 export default connectDb



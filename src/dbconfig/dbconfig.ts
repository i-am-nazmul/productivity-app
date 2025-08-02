import mongoose from "mongoose";

const connect = async function ()
{
      try 
      {
            mongoose.connect(process.env.MONGODB_URI!);
            const connection = mongoose.connection;
            connection.on('connection',()=>{
                  console.log("MongoDB connected successfully!!");
            })
            connection.on('error',(err)=>{
                  console.log("Make sure MongoDB is connected "+err);
                  process.exit();
            })

      } catch (error) 
      {
            console.log("Something went wrong!!");
            console.log(error);

      }
}

export {connect}
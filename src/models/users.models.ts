import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
      username : {
            type : String,
            required : [true,"Please enter a username !! "]

      },
      email : {
            type : String,
            required : [true,"Please enter an email !! "]
            
      },
      password : {
            type : String ,
            required : [true,"Please enter a password !! "]
            
      }
});
const Users = mongoose.models.users || mongoose.model("users",userSchema);
export default Users;
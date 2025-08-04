import mongoose, { Schema } from "mongoose";
const goalSchema = new mongoose.Schema({
      owner :{
            type : Schema.Types.ObjectId,
            ref : "Users"
      },
      goal : {
            type : String 

      }
});
const Goals = mongoose.models.goals || mongoose.model("goals",goalSchema);
export default Goals;
import mongoose from "mongoose";
const GoalSchema = new mongoose.Schema({
      task : {
            type : String 

      }
});
const Goals = mongoose.model("goals",GoalSchema);
export default Goals;
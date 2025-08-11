import mongoose, { Schema } from "mongoose";
const goalDataSchema = new mongoose.Schema({
      goal :{
            type : Schema.Types.ObjectId,
            ref : "Goals"
      },
      duration : {
            type : Number 

      },
      date : {
            type : Date
      }
});
const GoalData = mongoose.models.goaldata || mongoose.model("goaldata",goalDataSchema);
export default GoalData;
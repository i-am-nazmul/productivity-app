import { useAddGoalInput,useDuartionInput, useCurrentGoal} from "@/store/store"



export default function Goals({ goals }: { goals: { 
      _id: string; 
      owner : string ;
      goal: string;
      __v : string

 }[] })
{
      const { displayGoalInput, showGoalInput, hideGoalInput } = useAddGoalInput();
      const { displayDurationInput, hideDurationInput, showDurationInput } = useDuartionInput();
      const {currentGoal,setCurrentGoal}=useCurrentGoal();
      
      
      return (
            <div className="flex flex-col justify-between h-full">
                  <div>
                        <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Goals</h1>
                        <ul className="font-mono tracking-tight px-4 py-2 bg-amber-200 w-max rounded-sm">
                              {goals.map((goalObj) => (
                              <li key={goalObj._id}
                              className="flex ">
                                    <button className="cursor-pointer w-full text-start px-6 py-2 rounded-sm font-semibold text-gray-700 text-2xl tracking-tighter hover:bg-amber-300 hover:text-black"
                                    onClick={() => setCurrentGoal(goalObj.goal)}>
                                    {goalObj.goal}
                                    </button>
                                    
                              </li>
                              ))}
                        </ul>

                  </div>

                  
            </div>
      )
}
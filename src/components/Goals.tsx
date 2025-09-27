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
                  <div >
                        <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Goals</h1>
                        {goals && goals.length ? <ul className="font-mono tracking-tight px-4 py-2 bg-amber-200 w-max rounded-sm">
                              {goals.map((goalObj) => (
                              <li key={goalObj._id}
                              className="flex justify-between items-center my-2">
                                    <button className={`cursor-pointer w-full text-start px-6 py-2 rounded-sm font-semibold text-gray-700 text-2xl tracking-tighter ${currentGoal === goalObj.goal? "bg-gray-900 text-white shadow-md": "hover:bg-amber-300"}`} onClick={() => setCurrentGoal(goalObj.goal)}>
                                          {goalObj.goal}


                                    </button>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                          </svg>
                                    
                              </li>
                              ))}
                        </ul>  : <h1 className="text-2xl font-bold tracking-tighter bg-amber-200 max-w-max text-gray-600 text-center px-4 font-mono">Please add your Goals</h1>}

                  </div>

                  
            </div>
      )
}
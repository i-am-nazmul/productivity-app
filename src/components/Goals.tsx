import { useAddGoalInput,useDuartionInput } from "@/store/store"



export default function Goals({goals}:{goals : string[]}){
      const { displayGoalInput, showGoalInput, hideGoalInput } = useAddGoalInput();
      const { displayDurationInput, hideDurationInput, showDurationInput } = useDuartionInput();

      function addGoalButton(){
            showGoalInput();
            hideDurationInput();
      }
      
      return (
            <div className="flex flex-col justify-between h-full">
                  <div>
                        <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Goals</h1>
                        <ul className="font-mono tracking-tight px-4 bg-amber-200 w-max">

      
                              
                              {goals.map((goal, index) => (
                              <li key={index}>
                              <button className="cursor-pointer w-full text-start px-6 py-2 rounded-sm font-semibold text-gray-700 text-2xl tracking-tighter hover:bg-amber-300 hover:text-black">
                                    {goal}
                              </button>
                              </li>
                              ))}
                        </ul>
                  </div>

                  <button className="font-mono tracking-tight bg-emerald-900 text-white cursor-pointer px-2" onClick={addGoalButton}>Add new goal</button>
            </div>
      )
}
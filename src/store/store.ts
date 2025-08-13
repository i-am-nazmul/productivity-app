import { create } from 'zustand';

//for loading the tasks from the server
type GoalList = {
  goals: string[];
  addGoal: (goal: string) => void;
  setGoals: (goals: string[]) => void; //  Add this
};
const useGoalList = create<GoalList>((set) => ({
  goals: [],
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),
  setGoals: (goals) => set({ goals }) //  This replaces the entire array
}));


//for manipulation of goal input box
type GoalInput = {
  displayGoalInput : boolean;
  hideGoalInput : () => void ;
  showGoalInput : () => void ;

}
const useAddGoalInput = create<GoalInput>((set)=>({
  displayGoalInput : false ,
  hideGoalInput : () => set({displayGoalInput : false}),
  showGoalInput : () => set({displayGoalInput : true}),
}));



//for manipulation of duration input 
type DurationInput = {
  displayDurationInput : boolean;
  hideDurationInput : () => void ;
  showDurationInput : () => void ;

}
const useDuartionInput = create<DurationInput>((set)=>({
  displayDurationInput : false ,
  hideDurationInput : () => set({displayDurationInput : false}),
  showDurationInput : () => set({displayDurationInput : true}),
}))







// for logging the duration
type Duration = {
  duration: number;
  setDuration: (value : number) => void;

};

const useDuartion = create<Duration>((set) => ({
  duration:0,
  setDuration: (value) => set((state) => ({ duration: value })),
}));


//current goal selected 
// type CurrentGoal = {
//   currentGoal : goals[0],
//   setCurrentGoal = 
// }





export {useGoalList,useAddGoalInput,useDuartionInput,useDuartion}

import { create } from 'zustand';




//for loading the tasks from the server
type Goal = {
  _id: string;
  owner : string;
  goal: string;
  __v: string;
};

type GoalList = {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
};


const useGoalList = create<GoalList>((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
}));






//for manipulation of goal input box
type GoalInput = {
  displayGoalInput : boolean;
  hideGoalInput : () => void ;
  showGoalInput : () => void ;

}
const useAddGoalInput = create<GoalInput>((set)=>({
  displayGoalInput : true ,
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
type CurrentGoal = {
  currentGoal : string,
  setCurrentGoal : (value : string) => void ;
}

const useCurrentGoal = create<CurrentGoal>((set)=>({
  currentGoal : '',
  setCurrentGoal : (value) =>set((state)=>({currentGoal:value}))

}))



//current date selected 
type CurrentDate = {
  currentDate : Date,
  setCurrentDate : (value : Date) => void ;
}

const useCurrentDate = create<CurrentDate>((set)=>({
  currentDate : new Date(),
  setCurrentDate : (value) =>set((state)=>({currentDate:value}))

}))



//global dates with duration 
type DateWithDuration = {
  date: Date;
  duration: number;
};

type DatesStore = {
  datesWithDuration: DateWithDuration[];
  setDatesWithDuration: (dates: DateWithDuration[]) => void;
};

const useDatesWithDuration = create<DatesStore>((set) => ({
  datesWithDuration: [],

  // this will overwrite old data completely
  setDatesWithDuration: (dates) => set({ datesWithDuration: dates }),
}));







export {useGoalList,useAddGoalInput,useDuartionInput,useDuartion,useCurrentGoal,useCurrentDate,useDatesWithDuration}

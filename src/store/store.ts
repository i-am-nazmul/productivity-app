// stores/goalStore.ts
import { create } from 'zustand';

type GoalList = {
  goals: string[];
  addGoal: (goal: string) => void;
  
};

const useGoalList = create<GoalList>((set) => ({

  goals: [],

  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    }))
}));

export default useGoalList;

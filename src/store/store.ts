import { create } from 'zustand';

type GoalList = {
  goals: string[];
  addGoal: (goal: string) => void;
  setGoals: (goals: string[]) => void; // ✅ Add this
};

const useGoalList = create<GoalList>((set) => ({
  goals: [],
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),
  setGoals: (goals) => set({ goals }) // ✅ This replaces the entire array
}));

export default useGoalList;

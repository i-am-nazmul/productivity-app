import { useIsLoading, useGoalList, useCurrentGoal } from "./store";
import axios from "axios";
import { useCallback } from "react";

export function useGetAllGoals() {
const setIsLoading = useIsLoading((state) => state.setIsLoading);
const setGoals = useGoalList((state) => state.setGoals);
const setCurrentGoal = useCurrentGoal((state) => state.setCurrentGoal);


  const getAllGoals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/get-goals");
      const goalArray = response.data?.goals || [];

      setGoals(goalArray);
      setCurrentGoal(goalArray[0]?.goal || "");
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
    setIsLoading(false);
  }, [setIsLoading, setGoals, setCurrentGoal]);

  return getAllGoals;
}

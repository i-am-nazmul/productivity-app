
import { useIsLoading, useGoalList, useCurrentGoal } from "./store";
import axios from "axios";

export function useGetAllGoals() {
  const { setIsLoading } = useIsLoading();
  const { setGoals } = useGoalList();
  const { setCurrentGoal } = useCurrentGoal();

  const getAllGoals = async () => {
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
  };

  return getAllGoals;
}

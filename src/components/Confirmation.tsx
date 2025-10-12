import React from 'react'
import { useIsConfirming, useGoalList, useIsLoading, useLoaderMessage } from '@/store/store'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useGetAllGoals } from '@/store/global_functions'

type GoalProps = {
  goal: string
}

const Confirmation = ({ goal }: GoalProps) => {
  const { setIsConfirming } = useIsConfirming();
  const { goals, setGoals } = useGoalList();
  const { setIsLoading } = useIsLoading();
  const { setLoaderMessage } = useLoaderMessage();
  const getAllGoals=useGetAllGoals();

  const handleClose = () => {
    setIsConfirming(false);
  };

  const deleteGoal = async () => {
    setIsConfirming(false);
    setLoaderMessage('Deleting your goal...');
    setIsLoading(true);

    try {
      const response = await axios.delete('/api/delete-goal', { data: { goal } });

      if (response.status !== 200) {
        throw new Error('Failed to delete goal');
      }


      setGoals(goals.filter((g) => g.goal !== goal));
      await getAllGoals();

      toast.success("Goal deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete goal!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 '>
      <div className='bg-white flex flex-col items-center justify-center rounded-lg shadow-lg p-6 max-w-sm text-center'>
        <h1 className='text-4xl font-bold tracking-tighter text-gray-900 text-center m-4'>Do you want to delete {goal}?
        </h1>
        <div className='flex gap-4 justify-center w-full mt-4'>
          <button
            className='bg-gray-900 text-white px-4 py-1 rounded-md text-2xl cursor-pointer'
            onClick={handleClose}
          >
            No
          </button>
          <button
            className='bg-gray-900 text-white px-4 py-1 rounded-md text-2xl cursor-pointer'
            onClick={deleteGoal}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

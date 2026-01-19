type RequiredVariablesAndFunctions = {
  newGoal: string;
  setNewGoal: (value: string) => void;
  addNewGoal: () => void;
};

const AddNewGoal = ({
  newGoal,
  setNewGoal,
  addNewGoal,
}: RequiredVariablesAndFunctions) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewGoal();
      }}
      className="flex w-full flex-col gap-2 sm:flex-row"
    >
      <input
        type="text"
        value={newGoal}
        onChange={(e) => {
          setNewGoal(e.target.value);
        }}
        placeholder="Enter the new Goal"
        className="w-full rounded-sm bg-amber-200 px-3 py-2 text-base outline-none sm:w-auto sm:text-lg"
      />
      <button
        className="w-full rounded-sm bg-emerald-900 px-4 py-2 text-base text-white cursor-pointer sm:w-auto sm:text-lg"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddNewGoal;
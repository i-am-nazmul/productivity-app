type RequiredVariablesAndFunctions = {
  setDuration: (value: number) => void;
  saveGoalDetails: () => void;
};

const AddGoalData = ({ setDuration, saveGoalDetails }: RequiredVariablesAndFunctions) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveGoalDetails();
      }}
      className="flex w-full flex-col gap-2 sm:flex-row sm:items-center"
    >
      <input
        type="number"
        placeholder="Enter duration in Hours"
        className="w-full rounded-sm bg-amber-200 px-3 py-2 text-base outline-none sm:text-lg lg:text-2xl"
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <button
        className="w-full cursor-pointer rounded-sm bg-emerald-900 px-4 py-2 text-base text-white sm:w-auto sm:text-lg lg:text-2xl"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddGoalData;
const StepD = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleSubmitFormData,
}: any) => {
  return (
    <div>
      <h1 className="mt-2 text-md text-blue-900">Confirm Form Data</h1>

      <div className="my-4 flex items-center">
        <input
          type="checkbox"
          name="agreeToTerms"
          id="agreeToTerms"
          value={formData.agreeToTerms}
          onChange={(e) => handleChangeInput(e)}
          className="w-4 h-4 mr-2 accent-pink-300 focus:accent-pink-500"
        />
        <label htmlFor="agreeToTerms">I Agree to Terms of Services</label>
      </div>

      <div className="my-2 flex justify-between items-center">
        <button
          className="bg-primary mt-2 text-white px-2 py-1 rounded-sm"
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          className="bg-primary w-full ml-2 mt-2 text-white px-2 py-1 rounded-sm"
          onClick={handleSubmitFormData}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default StepD;

const DataConfirmRow = ({ label, value }: any) => {
  return (
    <div className="my-3 border border-dashed border-gray-200 p-1 rounded-lg">
      <span className="mr-4 text-slate-500">{label}</span>
      <span className="mr-4 text-slate-900">{value}</span>
    </div>
  );
};

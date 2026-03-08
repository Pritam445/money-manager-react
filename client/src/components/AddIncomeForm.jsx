import React, { useState } from "react";
import EmojiPickerPopUp from "./EmogiPickerPopUp";
import Input from "./Input";
import { Loader2 } from "lucide-react";

const AddIncomeForm = ({ onAddIncome,loading, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    categoryId: "",
    icon: "",
  });

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div>
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input

        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeholder={"e.g., Salary, Freelance, Bonus..."}
        type={"text"}
      />

      <Input
        label="Category"
        options={categoryOptions}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        value={income.categoryId}
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder={"e.g., 1000"}
        type={"number"}
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label={"Date"}
        placeholder=""
        type={"date"}
      />

      <div className="flex justify-end mt-6">
        <button type="button" disabled={loading} onClick={() => onAddIncome(income)} className="bg-purple-800 py-2 px-4 rounded-lg text-white active:scale-95 hover:scale-105 transition-all duration-200">
          {loading ? (
            <div className="w-full flex items-center justify-center gap-2">
                <Loader2 className="animate-spin text-white" /> Adding...
            </div>
          ) : "Add Income"}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

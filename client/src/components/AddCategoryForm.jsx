import React, { useEffect, useState } from "react";
import Input from "./Input";
import EmogiPickerPopUp from "./EmogiPickerPopUp";
import { Loader2 } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory({
        id: initialCategoryData.id,
        name: initialCategoryData.name || "",
        type: initialCategoryData.type || "income",
        icon: initialCategoryData.icon || "",
      });
    } else {
      setCategory({
        name: "",
        type: "income",
        icon: "",
      });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    {
      label: "Income",
      value: "income",
    },
    {
      label: "Expense",
      value: "expense",
    },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4 py-2">
      <EmogiPickerPopUp
        icon={category.icon}
        onSelect={(icon) => handleChange("icon", icon)}
      />
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g. Freelance, Salary etc..."
        type="text"
      />

      <Input
        label={"Category"}
        value={category.type}
        isSelect={true}
        onChange={({ target }) => handleChange("type", target.value)}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          disabled={loading}
          type="button"
          onClick={handleSubmit}
          className="bg-purple-800 hover:bg-purple-900 active:scale-95 transition-all duration-200 cursor-pointer text-white py-2 px-4 rounded-lg"
        >
          {loading ? (
            <div className="flex items-center gap-2 justify-center w-full">
              <Loader2 className="size-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </div>
          ) : (
            <>{isEditing ? "Update Category" : "Add Category"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;

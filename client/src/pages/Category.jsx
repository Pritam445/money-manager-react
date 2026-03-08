import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Plus } from "lucide-react";
import { axiosConfig } from "../util/config";
import { API_ENPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import CategoryList from "../components/CategoryList";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("Categories: ", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log("Something went worng. Please try again", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {

    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    const isDuplicate = categoryData.some((cat) => {
      return cat.name.toLowerCase() === name.toLowerCase();
    })

    if (isDuplicate) {
      toast.error("Category name already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENPOINTS.ADD_CATEGORIES, {name, type, icon});
      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModel(false);
        fetchCategoryDetails();
      }
      
      
    } catch (error) {
      console.error('Error adding category', error);
      toast.error(error.response?.data.message || "Failed to addd category.");
      
    }
    

  }

  const handleEditCategory = async (categoryToEdit) => {
    console.log("Edit category: ", categoryToEdit);
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  }

  const handleUpdateCategory = async (updatedCategory) => {

    const {id, name, type, icon} = updatedCategory;
    console.log("Edit category: ", updatedCategory);

    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }
    
    try {
      const response = await axiosConfig.put(API_ENPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon
      });

      console.log("Response: ", response.data);
      if(response.status === 200){
        toast.success("Category updated successfully");
        setOpenEditCategoryModel(false);
        setSelectedCategory(null);
        fetchCategoryDetails();
      }
      
    } catch (error) {
      console.error('Error updating category', error);
      toast.error(error.response?.data.message || "Failed to update category.");
      
    }
  }

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModel(true)}
            className="bg-linear-to-r from-purple-100 to-blue-100 py-2 px-3 rounded-lg active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>
        {/* Category list  */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

        {/* Adding category model  */}
        <Model
          title="Add Category"
          isOpen={openAddCategoryModel}
          onClose={() => setOpenAddCategoryModel(false)}
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Model>

        {/* Updating category model  */}
        <Model
        title={"Update Category"}
        isOpen={openEditCategoryModel}
        onClose={() => {
          setOpenEditCategoryModel(false);
          setSelectedCategory(null);
        }

        }
        >
          <AddCategoryForm 
          initialCategoryData = {selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Model>
      </div>
    </Dashboard>
  );
};

export default Category;

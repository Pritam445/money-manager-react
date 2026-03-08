
import Dashboard from '../components/Dashboard'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { API_ENPOINTS } from '../util/apiEndpoints';
import { axiosConfig } from '../util/config';
import IncomeList from '../components/IncomeList';
import Model from '../components/Model';
import { Plus } from 'lucide-react';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';
import IncomeOverview from '../components/IncomeOverview';
import { AppContext } from '../context/AppContext';


const Expense = () => {
  
  const {user} = useContext(AppContext)

  const [expenseData, setExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [openDeleteExpenseModel, setOpenDeleteExpenseModel] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        console.log("Expense: ", response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went worng. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to fetch expenses details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {

    try {

      const response = await axiosConfig.get(API_ENPOINTS.CATEGORY_BY_TYPE("expense"))

      if(response.status === 200){
        console.log("Categories: ", response.data);
        setCategoryData(response.data);
      }
      
    } catch (error) {
      console.log("Something went worng. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to fetch income categories details.");
      
    }
    
  }

  const handleAddExpense = async (expense) => {
    console.log("Add expense: ", expense);
    setLoading(true);

    const { name, amount, date, categoryId, icon } = expense;

    if(!name.trim()) {
      toast.error("Category Name is required");
      setLoading(false);
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount is required and should be greater than 0");
      setLoading(false);
      return;
    }

    if(!date) {
      toast.error("Date is required");
      setLoading(false);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if(date > today) {
      toast.error("Date cannot be in the future");
      setLoading(false);
      return;
    }

    if(!categoryId) {
      toast.error("Category is required");
      setLoading(false);
      return;
    }

    try {
      const reponse = await axiosConfig.post(API_ENPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        categoryId,
        icon
      })

      if(reponse.status === 201){
        toast.success("Expense added successfully");
        setOpenAddExpenseModel(false);
        fetchExpenseDetails();
      }
      setLoading(false);
      
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to add expense.");
      
    }finally {
      setLoading(false);
    }

  }

  const handleExpenseDelete = async (id) => {
    console.log("Delete expense: ", id);

    setLoading(true);
    try {

      const response = await axiosConfig.delete(API_ENPOINTS.DELETE_EXPENSES(id));
      
      if(response.status === 200){
        toast.success("Expense deleted successfully");
        setOpenDeleteExpenseModel({show: false, data: null});
        fetchExpenseDetails();
        
      }
      
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to delete expense.");
      
    }finally {
      setLoading(false);
    }
    
  }

  const handleDownloadExpenseDetails = async () => {
    // console.log("Download income details");
    try {

      const response = await axiosConfig.get(API_ENPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: 'blob' })
      let filename = "expense_details.xlsx";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded successfully");
      
      
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to download expense details.");
      
    }

    
   
  }

  const handleEmailExpenseDetails = async () => {
    // console.log("Email income details");
     try {

    await axiosConfig.get(API_ENPOINTS.EMAIL_EXPENSES, {
      params: { email: user.email }
    });

    toast.success("Income report sent to your email");

  } catch (error) {
    toast.error("Failed to send email");
    console.log(error);
  }
     
   
  }

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  
  return (
  <Dashboard activeMenu="Expense">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div>
          {/* overview for income with line chart  */}
          
          <IncomeOverview transactions={expenseData} onAddIncome={() => setOpenAddExpenseModel(true)} title={"Expense Overview"} type={"expense"} />
        </div>
        <IncomeList type="expense" onDownload = {handleDownloadExpenseDetails} onEmail={handleEmailExpenseDetails} transactions={expenseData} onDelete={(id) => setOpenDeleteExpenseModel({ show: true, data: id })} />

          {/* Add Expense model  */}

          <Model isOpen={openAddExpenseModel} onClose={() => setOpenAddExpenseModel(false)} title="Add Expense" >
            <AddIncomeForm type="expense" onAddIncome={handleAddExpense} loading={loading} categories={categoryData} />

          </Model>

          {/* Delete Expense Model  */}
          <Model
          isOpen={openDeleteExpenseModel.show}
          onClose={() => setOpenDeleteExpenseModel({ show: false, data: null })}
          title="Delete Income"
           >
            <DeleteAlert content={"Are you sure want to delete this expense details?"} onDelete={() => handleExpenseDelete(openDeleteExpenseModel.data)} />

           </Model>
      </div>
    </div>
  </Dashboard>
  )
}

export default Expense
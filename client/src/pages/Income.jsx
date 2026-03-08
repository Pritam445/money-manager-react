import React, { useContext, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
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


const Income = () => {

  const {user} = useContext(AppContext)

  const [incomeData, setIncomeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteIncomeModel, setOpenDeleteIncomeModel] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetals = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        console.log("Incomes: ", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went worng. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to fetch incomes details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {

    try {

      const response = await axiosConfig.get(API_ENPOINTS.CATEGORY_BY_TYPE("income"))

      if(response.status === 200){
        console.log("Categories: ", response.data);
        setCategoryData(response.data);
      }
      
    } catch (error) {
      console.log("Something went worng. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to fetch income categories details.");
      
    }
    
  }

  const handleAddIncome = async (income) => {
    console.log("Add income: ", income);
    setLoading(true);

    const { name, amount, date, categoryId, icon } = income;

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
      const reponse = await axiosConfig.post(API_ENPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        categoryId,
        icon
      })

      if(reponse.status === 201){
        toast.success("Income added successfully");
        setOpenAddIncomeModel(false);
        fetchIncomeDetals();
      }
      setLoading(false);
      
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to add income.");
      
    }finally {
      setLoading(false);
    }

  }

  const handleIncomeDelete = async (id) => {
    console.log("Delete income: ", id);

    setLoading(true);
    try {

      const response = await axiosConfig.delete(API_ENPOINTS.DELETE_INCOME(id));
      
      if(response.status === 200){
        toast.success("Income deleted successfully");
        setOpenDeleteIncomeModel({show: false, data: null});
        fetchIncomeDetals();
        
      }
      
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to delete income.");
      
    }finally {
      setLoading(false);
    }
    
  }

  const handleDownloadIncomeDetails = async () => {
    // console.log("Download income details");
    try {

      const response = await axiosConfig.get(API_ENPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: 'blob' })
      let filename = "income_details.xlsx";

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
      toast.error(error.response?.data?.message || "Failed to download income details.");
      
    }

    
   
  }

  const handleEmailIncomeDetails = async () => {
    // console.log("Email income details");
     try {

    await axiosConfig.get(API_ENPOINTS.EMAIL_INCOMES, {
      params: { email: user.email }
    });

    toast.success("Income report sent to your email");

  } catch (error) {
    toast.error("Failed to send email");
    console.log(error);
  }
     
   
  }

  useEffect(() => {
    fetchIncomeDetals();
    fetchIncomeCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  
  return (
  <Dashboard activeMenu="Income">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div>
          {/* overview for income with line chart  */}
          
          <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModel(true)} title={"Income Overview"} type={"income"}/>
        </div>
        <IncomeList type={"income"} onDownload = {handleDownloadIncomeDetails} onEmail={handleEmailIncomeDetails} transactions={incomeData} onDelete={(id) => setOpenDeleteIncomeModel({ show: true, data: id })} />

          {/* Add income model  */}

          <Model isOpen={openAddIncomeModel} onClose={() => setOpenAddIncomeModel(false)} title="Add Income">
            <AddIncomeForm type={"income"} onAddIncome={handleAddIncome} loading={loading} categories={categoryData} />

          </Model>

          {/* Delete Income Model  */}
          <Model
          isOpen={openDeleteIncomeModel.show}
          onClose={() => setOpenDeleteIncomeModel({ show: false, data: null })}
          title="Delete Income"
           >
            <DeleteAlert content={"Are you sure want to delete this income details?"} onDelete={() => handleIncomeDelete(openDeleteIncomeModel.data)} />

           </Model>
      </div>
    </div>
  </Dashboard>
  )
}

export default Income
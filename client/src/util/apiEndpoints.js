export const BASE_URL = 'https://money-manager-api-ubna.onrender.com/api/v1.0'

const CLOUDINARY_CLOUD_NAME = "dt8jhphs2";


export const API_ENPOINTS = {
    LOGIN: "/profile/login",
    REGISTER: "/profile/register",
    USER_INFO: "/profile/info",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORIES: "/categories/create",
    GET_ALL_INCOMES: "/incomes/currentMonthIncome",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes/add",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/incomes/download",
    EMAIL_INCOMES: "/incomes/email",
    ADD_EXPENSE: "/expenses/add",
    DELETE_EXPENSES: (expenseId) => `/expenses/${expenseId}`,
    GET_ALL_EXPENSES: "/expenses/currentMonthExpenses",
    EXPENSE_EXCEL_DOWNLOAD: "/expenses/download",
    EMAIL_EXPENSES: "/expenses/email",
    FILTER_TRANSACTIONS:"/filter",
    DASHBOARD_DATA:"/dashboard/get",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,


}
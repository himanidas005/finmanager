import axios from "axios"; // Import Axios for API requests

const API_URL = "http://localhost:5001/api/expenses"; // Backend URL

// ✅ Fetch all expenses
export const getExpenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// ✅ Add a new expense
export const addExpense = async (expense) => {
    const response = await axios.post(API_URL, expense);
    return response.data;
};

// ✅ Delete an expense by ID
export const deleteExpense = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// ✅ Update an expense
export const updateExpense = async (id, expense) => {
    const response = await axios.put(`${API_URL}/${id}`, expense);
    return response.data;
};
